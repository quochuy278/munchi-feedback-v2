FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
COPY --chown=node:node  ./scripts/gcloud_start.sh ./gcloud_start.sh
# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

ENV NODE_ENV production

# Run the build command which creates the production bundle
RUN npm run build

CMD ["bash", "./gcloud_start.sh"]