FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Set ENV variable during build time
ENV NEXT_PUBLIC_API_URL="https://apiv4.ordering.co/v400/en/peperoni/"
ENV NEXT_PUBLIC_PRIVATE_DOMAIN="https://munchi-dashboard-api-ydtudzlala-lz.a.run.app/"

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