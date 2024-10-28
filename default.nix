{ pkgs ? import <nixpkgs> {} }:

let
  mariadb_data_dir = "./mariadb_data";
  mariadb_socket = "/tmp/mysqld.sock";
  adminer_port = 8080;
  moodle_db_name = "moodle";
  moodle_sql_file = "./MoodleSQL.sql";
  root_password = "root";
  myphp = pkgs.php.buildEnv { extensions = (phpExtensions: with phpExtensions; [
    pkgs.php.extensions.dom
    pkgs.php.extensions.mbstring
    pkgs.php.extensions.tokenizer
    pkgs.php.extensions.xmlwriter
    pkgs.php.extensions.simplexml
    pkgs.php.extensions.opcache
    pkgs.php.extensions.iconv
    pkgs.php.extensions.mysqli
    pkgs.php.extensions.zip
    pkgs.php.extensions.gd
    pkgs.php.extensions.intl
    pkgs.php.extensions.fileinfo
    pkgs.php.extensions.sodium
    pkgs.php.extensions.ctype
    pkgs.php.extensions.bcmath
    pkgs.php.extensions.calendar
    pkgs.php.extensions.curl
    pkgs.php.extensions.exif
    pkgs.php.extensions.filter
    pkgs.php.extensions.ftp
    pkgs.php.extensions.gettext
    pkgs.php.extensions.gmp
    pkgs.php.extensions.imap
    pkgs.php.extensions.ldap
    pkgs.php.extensions.openssl
    pkgs.php.extensions.posix
    pkgs.php.extensions.session
    pkgs.php.extensions.soap
    pkgs.php.extensions.sockets
    pkgs.php.extensions.sysvsem
    pkgs.php.extensions.xmlreader
    pkgs.php.extensions.zlib
  ]);
    extraConfig = "max_input_vars = 5000
memory_limit = 256M
post_max_size = 50M
upload_max_filesize = 50M";
  };

in
pkgs.mkShell {
  buildInputs = with pkgs; [
    myphp
    mariadb
    wget
    curl
    procps
    lsof
    php.packages.composer
    glibcLocales
  ];

  shellHook = ''
    MOODLE_ROOT="$(realpath server/moodle)"
    export LANG="en_AU.UTF-8"
    export LC_ALL="en_AU.UTF-8"

    # Function to check and kill existing processes
    kill_existing() {
      local process=$1
      if pgrep -x "$process" > /dev/null; then
        echo "Killing existing $process process..."
        pkill -x "$process"
        sleep 2
      fi
    }

    # Function to kill process using a specific port
    kill_port_user() {
      local port=$1
      local pid=$(lsof -ti:$port)
      if [ ! -z "$pid" ]; then
        echo "Killing process using port $port..."
        kill -9 $pid
        sleep 2
      fi
    }

    # Ensure MariaDB data directory exists with correct permissions
    mkdir -p ${mariadb_data_dir}
    chmod 755 ${mariadb_data_dir}

    # Initialize MariaDB with native AIO disabled on macOS
    if [ ! -d "${mariadb_data_dir}/mysql" ]; then
      mysql_install_db --datadir=${mariadb_data_dir} --innodb-use-native-aio=0
      mysqld --datadir=${mariadb_data_dir} --socket=${mariadb_socket} --skip-grant-tables &
      TEMP_MYSQL_PID=$!
      while [ ! -S ${mariadb_socket} ]; do
        echo "Waiting for MariaDB socket..."
        sleep 1
      done
      echo "MariaDB is up."

      # Set root password and enable InnoDB as the default engine
      mysql -uroot -S${mariadb_socket} <<EOF
      FLUSH PRIVILEGES;
      ALTER USER 'root'@'localhost' IDENTIFIED BY '${root_password}';
      FLUSH PRIVILEGES;
      SET GLOBAL max_connections = 200;
      SET default_storage_engine=INNODB;
EOF

      # Verify root password
      mysql -uroot -p${root_password} -S${mariadb_socket} -e "SELECT 1;" || {
        echo "Error: Root password verification failed."
        kill $TEMP_MYSQL_PID
        wait $TEMP_MYSQL_PID
        exit 1
      }

      # Create the Moodle database and import SQL file with explicit engine setting
      mysql -uroot -p${root_password} -S${mariadb_socket} -e "CREATE DATABASE IF NOT EXISTS ${moodle_db_name}" || {
        echo "Error: Failed to create database ${moodle_db_name}."
        kill $TEMP_MYSQL_PID
        wait $TEMP_MYSQL_PID
        exit 1
      }
      if [ -f "${moodle_sql_file}" ]; then
        mysql -uroot -p${root_password} -S${mariadb_socket} ${moodle_db_name} -e "SET default_storage_engine=INNODB; source ${moodle_sql_file};" && {
          echo "SQL file imported successfully."
        } || {
          echo "Error: Failed to import SQL file."
        }
      else
        echo "Warning: ${moodle_sql_file} not found. Database created but not populated."
      fi

      kill $TEMP_MYSQL_PID
      wait $TEMP_MYSQL_PID
    fi

    # Kill existing MariaDB and PHP processes
    kill_existing "mysqld"
    kill_existing "php"

    # Start MariaDB
    start_mariadb() {
      echo "Starting MariaDB..."
      mysqld --datadir=${mariadb_data_dir} --socket=${mariadb_socket} &
      MARIADB_PID=$!
      while [ ! -S ${mariadb_socket} ]; do
        echo "Waiting for MariaDB socket..."
        sleep 1
      done
      echo "MariaDB is up."
    }

    # Function to import the Moodle SQL file
    import_db(){
      if [ -f "${moodle_sql_file}" ]; then
        mysql -uroot -p${root_password} -S${mariadb_socket} ${moodle_db_name} <<EOF
        SET default_storage_engine=INNODB;
        source ${moodle_sql_file};
EOF
      fi
    }

    # Start Adminer
    start_adminer() {
      echo "Starting Adminer on port ${toString adminer_port}..."
      if [ ! -f "adminer.php" ]; then
        wget https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php -O adminer.php
      fi
      php -S 0.0.0.0:${toString adminer_port} adminer_router.php &
      ADMINER_PID=$!
    }

    # Start PHP server for Moodle
    start_php_server() {
      echo "Starting PHP built-in server for Moodle..."
      php -S 0.0.0.0:8000 -t ./server/moodle &
      PHP_SERVER_PID=$!
    }

    # Helper functions for PHP unit and Moodle config
    check_phpunit() {
      if [ ! -f "$MOODLE_ROOT/vendor/bin/phpunit" ]; then
        echo "PHPUnit not installed. Installing it now..."
        install_phpunit
      fi
      echo "PHPUnit found."
    }

    install_phpunit() {
      (cd "$MOODLE_ROOT" && composer require --dev phpunit/phpunit)
      echo "PHPUnit installed successfully."
    }

    create_config() {
      if [ ! -f "$MOODLE_ROOT/config.php" ]; then
        echo "No config found; creating a new one."
        php server/moodle/admin/cli/install.php \
            --lang=en \
            --wwwroot="http://localhost:8000/" \
            --dataroot="$(pwd)/server/moodledata" \
            --dbtype="mariadb" \
            --dbhost="127.0.0.1" \
            --dbuser="root" \
            --dbpass="${root_password}" \
            --dbport=3306 \
            --dbsocket="${mariadb_socket}" \
            --dbname="${moodle_db_name}" \
            --prefix="mdl_" \
            --non-interactive \
            --agree-license \
            --skip-database \
            --allow-unstable \
            --fullname="Moodle testing thing" \
            --shortname="mtt" \
            --adminpass="hunter2"
      fi
    }

    runit() {
      check_phpunit
      create_config
      php server/moodle/admin/tool/phpunit/cli/init.php 
      (cd "$MOODLE_ROOT" && find mod/livequiz/tests/phpunit -type f -exec vendor/bin/phpunit --verbose {} \;)
    }

    sniffit() {
      if [ ! -d "$MOODLE_ROOT/vendor/moodlehq" ]; then
        (cd "$MOODLE_ROOT" && composer config --no-plugins allow-plugins.dealerdirect/phpcodesniffer-composer-installer true && composer require moodlehq/moodle-cs)
      fi
      export PATH="$MOODLE_ROOT/vendor/bin:$PATH"
      phpcs "$MOODLE_ROOT/mod/livequiz/"
    }

    fixit() {
      phpcbf "$MOODLE_ROOT/mod/livequiz/"
    }

    # Trap to ensure services are stopped on exit
    trap stop_services EXIT
    start_mariadb
    start_adminer
    start_php_server

    echo "MariaDB, Adminer, and PHP server are now running."
    echo "Adminer available at http://localhost:${toString adminer_port}"
    echo "Moodle available at http://localhost:8000"
  '';
}
