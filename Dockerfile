# Ensure that the packages work via Verdaccio
FROM node:16-alpine3.11

# Copy basic files
WORKDIR /app
COPY .config ./.config
COPY scripts ./scripts
COPY package-lock.json package.json ./
RUN npm ci
COPY packages ./packages
COPY fixtures ./fixtures

# Start verdaccio and publish packages locally
RUN ./scripts/publish-to-verdaccio.sh