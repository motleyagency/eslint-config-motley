# Ensure that the packages work via Verdaccio
FROM node:16-alpine3.11

# Copy basic files
WORKDIR /app
COPY .config ./.config
COPY package-lock.json package.json README.md ./
RUN npm ci
COPY scripts ./scripts
COPY packages ./packages

COPY __fixtures__ ./__fixtures__
# Start verdaccio and publish packages locally, install deps
RUN ./scripts/publish-to-verdaccio.sh

COPY __tests__ ./__tests_

RUN ["ls", "-al", "__fixtures__/js/node_modules/eslint-config-motley"]
RUN ["ls", "-al", "__fixtures__/ts/node_modules/eslint-config-motley-typescript"]

ENTRYPOINT ["npm", "test"]