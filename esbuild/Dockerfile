ARG IMAGE=amazon/aws-sam-cli-build-image-nodejs12.x
FROM $IMAGE

# Ensure all users can write to npm cache
RUN mkdir /tmp/npm-cache && \
    chmod -R 777 /tmp/npm-cache && \
    npm config --global set cache /tmp/npm-cache && \
    npm config --global set update-notifier false && \
    npm config --global set unsafe-perm true

ARG ESBUILD_VERSION=0.7.17
RUN npm install -g esbuild@$ESBUILD_VERSION

CMD [ "esbuild" ]