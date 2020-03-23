import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import expressConfig from './frameworks/webserver/express';
import routes from './frameworks/webserver/routes';
import serverConfig from './frameworks/webserver/server';
import dbConnection from './frameworks/database/mongoDB/connection';

const app = express();
const server = require('http').createServer(app);

// express.js configuration (middlewares etc.)
expressConfig(app);
// routes for each endpoint
routes(app, express);
// server configuration and start
serverConfig(app, mongoose, server, config).startServer();
// DB configuration and connection create
dbConnection(mongoose, config, {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 10000,
  keepAlive: 120,
  connectTimeoutMS: 1000
}).connectToMongo();

// error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 404;
  return err.customMessage || err.message
    ? res.status(err.statusCode).json({ status: err.customMessage || err.message })
    : res.status(err.statusCode).json(err);
});

// Expose app
export default app;
