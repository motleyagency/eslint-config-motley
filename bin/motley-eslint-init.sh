PKG=eslint-config-airbnb

# Default to installing using npm
INSTALL="npm install --save-dev";

# Is this a yarn project and yarn is found in PATH, then install using yarn
if [[ -f $(PWD)/yarn.lock && -x $(which yarn) ]]
then
  INSTALL="yarn add --dev"
fi

npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs $INSTALL "$PKG@latest"
