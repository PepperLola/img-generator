const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const debug = require('debug')('img-generator:server');
const http = require('http');
require('dotenv').config();

const indexRouter = require('./routes/index');
const progressRouter = require('./routes/progress');
const semiRadialProgressRouter = require('./routes/semiRadialProgress');
const radialProgressRouter = require('./routes/radialProgress');
const multiProgressRouter = require('./routes/multiProgress');
const multiSemiRadialProgressRouter = require('./routes/multiSemiRadialProgress');
const multiRadialProgressRouter = require('./routes/multiRadialProgress');
const hypixelRouter = require('./routes/hypixel/hypixel');

const { Hypixel } = require('./hypixel/HypixelApi');

Hypixel.setApiKey(process.env.HYPIXEL_API_KEY);

Hypixel.getUuidFromName("palight").then(uuid => {
  Hypixel.getPlayerLevel(uuid).then(res => {
    console.log(res);
  });
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', progressRouter);
app.use('/', semiRadialProgressRouter);
app.use('/', radialProgressRouter);
app.use('/', multiProgressRouter);
app.use('/', multiSemiRadialProgressRouter);
app.use('/', multiRadialProgressRouter);
app.use('/hypixel', hypixelRouter);

module.exports = app;

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
