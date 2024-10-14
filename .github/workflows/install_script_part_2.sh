#!/bin/sh

cd "$REPO_ROOT"/server/moodle
composer require --dev phpunit/phpunit
mkdir "$REPO_ROOT"/server/moodledata/phpunit

php admin/cli/install.php \
	--lang=en \
	--wwwroot="http://localhost:8000/" \
	--dataroot="$REPO_ROOT/server/moodledata" \
	--dbpass=root \
	--dbport=3306 \
	--dbsocket=/tmp/mysqld.sock \
	--skip-database \
	--non-interactive \
	--agree-license \
	--allow-unstable \
	--fullname="Moodle testing thing" \
	--shortname="mtt" \
	--adminpass="hunter2"

echo "\$CFG->phpunit_prefix = 'phpu_';" >>"$REPO_ROOT"/server/moodle/config.php
# Specifying that it's the realpath isn't strictly necessary (because 
# we make it realpath on line ~3, but we do this redundantly anyway in 
# case some klaphat decides to modify line 3)
echo "\$CFG->phpunit_dataroot = '$(realpath "$REPO_ROOT"/server/moodledata/phpunit)';">>"$REPO_ROOT"/server/moodle/config.php

php admin/tool/phpunit/cli/init.php --configuration "$REPO_ROOT"/server/moodle/phpunit.xml

./vendor/bin/phpunit
