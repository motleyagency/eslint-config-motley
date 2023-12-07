#!/bin/sh

set -e
local_registry="http://localhost:4873"

# start local registry
sh -c "./node_modules/.bin/verdaccio --config .config/verdaccio/config.yaml --listen $local_registry &"

until $(curl --output /dev/null --silent --head --fail $local_registry); do
    printf '.'
    sleep 1
done

echo "Publishing locally"
cp .config/verdaccio/.npmrc packages/eslint-config-motley-typescript/.npmrc

# Run npm command
echo "Publishing eslint-config-motley-typescript locally"
cd packages/eslint-config-motley-typescript && sh -c "npm publish --registry $local_registry"
cd ../../
cp .config/verdaccio/.npmrc __fixtures__/ts/.npmrc

npm info eslint-config-motley-typescript --registry $local_registry

echo "Installing eslint-config-motley-typescript to fixtures/ts"
(
  cd __fixtures__/ts
  export PKG=eslint-config-motley-typescript
  npx install-peerdeps --only-peers $PKG --registry $local_registry
  npm install $PKG --registry $local_registry
  ls -al
)

echo "Finished!"