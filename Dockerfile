FROM        node:22.14.0-alpine as builder

COPY        package.json /srv/node-clean-architecture/
WORKDIR     /srv/node-clean-architecture/

RUN         yarn install --production

COPY        .babelrc /srv/node-clean-architecture/
COPY        .eslintrc.json /srv/node-clean-architecture/
COPY        app.js /srv/node-clean-architecture/
COPY        adapters /srv/node-clean-architecture/adapters/
COPY        application /srv/node-clean-architecture/application/
COPY        config /srv/node-clean-architecture/config/
COPY        frameworks /srv/node-clean-architecture/frameworks/
COPY        src /srv/node-clean-architecture/src/
COPY        tests /srv/node-clean-architecture/tests/

RUN         yarn run build

FROM        node:22.14.0-alpine

ENV         HTTP_MODE http
ARG         NODE_PROCESSES=2
ENV         NODE_PROCESSES=$NODE_PROCESSES

# Install pm2
RUN         npm install -g pm2

# Copy over code
WORKDIR     /srv/api/
COPY        --from=builder /srv/node-clean-architecture/build /srv/api/build
COPY        --from=builder /srv/node-clean-architecture/package.json /srv/api/package.json

RUN         deluser --remove-home node \
            && addgroup -S node -g 9999 \
            && adduser -S -G node -u 9999 node

CMD         ["npm", "start"]

USER        node