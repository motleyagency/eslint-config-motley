# Ensure that the packages work via Verdaccio
FROM node:16-alpine3.11

# Copy basic files
WORKDIR /app
COPY .config ./.config
COPY package-lock.json package.json ./
RUN npm ci
RUN npm install -g install-peerdeps
COPY scripts ./scripts
COPY packages ./packages

COPY __fixtures__ ./__fixtures__
# Start verdaccio and publish packages locally, install deps
RUN ./scripts/publish-to-verdaccio.sh

COPY __tests__ ./__tests_

ENTRYPOINT ["npm", "test"]