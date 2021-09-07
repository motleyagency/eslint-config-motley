#!/bin/sh

set -e

local_registry="http://0.0.0.0:4873"

# start local registry
tmp_registry_log=`mktemp`
sh -c "nohup ./node_modules/.bin/verdaccio --config /app/.config/verdaccio/config.yaml &>$tmp_registry_log &"
# wait for `verdaccio` to boot
echo "Waiting for verdaccio to start"
( tail -f $tmp_registry_log & ) | grep -q "http address"
# login so we can publish packages
echo "Logging in"
sh -c "./node_modules/.bin/npm-auth-to-token -u motley -p motley -e it@motley.fi -r $local_registry"

echo "Publishing packages locally"
cp .npmrc packages/eslint-config-motley/.npmrc
cp .npmrc packages/eslint-config-motley-typescript/.npmrc

# Run npm command
cd packages/eslint-config-motley && sh -c "npm --registry $local_registry publish"
cd ../eslint-config-motley-typescript && sh -c "npm --registry $local_registry publish"

cd ../../

cp .npmrc fixtures/js/.npmrc
cp .npmrc fixtures/ts/.npmrc

echo "Installing eslint-config-motley to fixtures/js"
(
  cd fixtures/js
  export PKG=eslint-config-motley;
  npm info --registry $local_registry "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --registry https://registry.npmjs.org --save-dev
)

echo "Installing eslint-config-motley-typescript to fixtures/ts"
(
  cd fixtures/ts
  export PKG=eslint-config-motley;
  npm install --registry $local_registry --legacy-peer-deps --save-dev "$PKG@latest"
  npm info --registry $local_registry "$PKG-typescript@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --legacy-peer-deps --registry https://registry.npmjs.org --save-dev
)