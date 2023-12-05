# Ensure that the packages work via Verdaccio
FROM node:20-alpine3.17

RUN apk --no-cache add curl

# Copy basic files
WORKDIR /app
COPY .config ./.config
COPY package-lock.json package.json README.md ./
RUN npm ci
COPY scripts ./scripts
COPY packages ./packages

COPY __fixtures__ ./__fixtures__

ENV VERDACCIO_USER_UID=10001 VERDACCIO_USER_NAME=verdaccio
RUN adduser -u $VERDACCIO_USER_UID -S -D -h /app -g "$VERDACCIO_USER_NAME user" -s /sbin/nologin $VERDACCIO_USER_NAME
RUN chown -R $VERDACCIO_USER_UID /app
USER $VERDACCIO_USER_UID

# Start verdaccio and publish packages locally, install deps
RUN ./scripts/publish-to-verdaccio.sh

COPY __tests__ ./__tests_

ENTRYPOINT ["npm", "test"]