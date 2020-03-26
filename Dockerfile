FROM        node:12.16.1-alpine as builder

COPY        package.json /srv/node-clean-architecture/
WORKDIR     /srv/node-clean-architecture/

RUN         yarn install

COPY        .babelrc /srv/node-clean-architecture/
COPY        .eslintrc.json /srv/node-clean-architecture/
COPY        app.js /srv/node-clean-architecture/dist-server/
COPY        adapters /srv/node-clean-architecture/dist-server/adapters/
COPY        application /srv/node-clean-architecture/dist-server/application/
COPY        config /srv/node-clean-architecture/dist-server/config/
COPY        frameworks /srv/node-clean-architecture/dist-server/frameworks/
COPY        src /srv/node-clean-architecture/dist-server/src/

RUN         yarn run build

FROM        node:12.16.1-alpine


ENV         HTTP_MODE http
ARG         NODE_PROCESSES=2
ENV         NODE_PROCESSES=$NODE_PROCESSES

# Install pm2
RUN         npm install -g pm2

# Copy over code
WORKDIR     /srv/api/
COPY        --from=builder /srv/node-clean-architecture/build /srv/api/build
COPY        --from=builder /srv/node-clean-architecture/node_modules /srv/api/node_modules
COPY        --from=builder /srv/node-clean-architecture/package.json /srv/api/package.json

RUN         deluser --remove-home node \
            && addgroup -S node -g 9999 \
            && adduser -S -G node -u 9999 node

CMD         ["npm", "start"]

USER        node