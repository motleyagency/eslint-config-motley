#!/bin/sh

set -e
local_registry="http://0.0.0.0:4873"

# start local registry
tmp_registry_log=`mktemp`
sh -c "nohup ./node_modules/.bin/verdaccio --config .config/verdaccio/config.yaml &>$tmp_registry_log &"
# login so we can publish package
echo "Logging in"
sh -c "./node_modules/.bin/npm-auth-to-token -u motley -p motley -e it@motley.fi -r $local_registry"

echo "Publishing package locally"
cp .npmrc packages/eslint-config-motley-typescript/.npmrc

# Run npm command
echo "Publishing eslint-config-motley-typescript locally"
cd ../eslint-config-motley-typescript && sh -c "npm publish --registry $local_registry"
cd ../../

cp .npmrc __fixtures__/ts/.npmrc

echo "Installing eslint-config-motley-typescript to fixtures/ts"
(
  cd __fixtures__/ts
  export PKG=eslint-config-motley-typescript
  npm_config_yes=true npx install-peerdeps --dev "$PKG@latest" --extra-args="--registry $local_registry"
  npm install --registry https://registry.npmjs.org react react-dom
)

echo "Finished!"

