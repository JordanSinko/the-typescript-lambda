ARG IMAGE=amazon/aws-sam-cli-build-image-nodejs12.x
FROM $IMAGE

ARG ESBUILD_VERSION=0.7.14
RUN cd / && npm install esbuild@$ESBUILD_VERSION --no-package-lock

# Ensure all users can write to npm cache
RUN mkdir /tmp/npm-cache && \
    chmod -R 777 /tmp/npm-cache && \
    npm config --global set cache /tmp/npm-cache

# Disable npm update notifications
RUN npm config --global set update-notifier false

CMD [ "esbuild" ]