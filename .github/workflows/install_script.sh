#!/bin/sh
set -x

REPO_ROOT="`pwd`"
PART_2_SCRIPT="$(realpath $(dirname "$0"))/install_script_part_2.sh"

sed -i \
	-e 's/;extension=gd/extension=gd/' \
	-e 's/;extension=intl/extension=intl/' \
	-e 's/;extension=sodium/extension=sodium/' \
	-e 's/;extension=zip/extension=zip/' \
	-e "s|curl\.cainfo.*|curl.cainfo=\"$REPO_ROOT/cacert.pem\"|" \
	-e "s|openssl\.cafile.*|openssl.cafile=\"$REPO_ROOT\"/server/apache/bin/curl-ca-bundle.crt|" \
	"$REPO_ROOT"/server/php/php.ini

cd "$REPO_ROOT"

curl https://curl.se/ca/cacert.pem >"$REPO_ROOT"/cacert.pem
ls -l
nix-shell --run "REPO_ROOT=$REPO_ROOT sh $PART_2_SCRIPT"

echo "Tests finished."
