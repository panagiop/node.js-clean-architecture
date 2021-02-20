import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import config from './config/config';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import serverConfig from './frameworks/webserver/server';
import mongoDbConnection from './frameworks/database/mongoDB/connection';
import redisConnection from './frameworks/database/redis/connection';
// middlewares
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';

const app = express();
const server = require('http').createServer(app);

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 10000,
  keepAlive: 120,
  connectTimeoutMS: 1000
}).connectToMongo();

const redisClient = redisConnection(redis, config).createRedisClient();

// routes for each endpoint
routes(app, express, redisClient);

// error handling middleware
app.use(errorHandlingMiddleware);

// Expose app
export default app;
