// load config
require('dotenv').config();

// Dependencies
const next = require('next');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// API Handler
const hexagon = require('./server/hexagon');

// Initiate server
const server = express();
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const connectDB = mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

app
  .prepare()
  .then(connectDB)
  .then(() => {
    // middlewares
    server.use(express.json());
    server.use(cors());

    // api routes
    server.use('/api/hexagon', hexagon);

    // healthcheck route
    server.get('/healthcheck', (_, res) => {
      res.json({ status: 'HEALTHY!' });
    });

    // Error handler
    server.use(function (err, req, res, next) {
      res.status(500).send({ message: err.message });
    });

    // next routes
    server.use((req, res) => handle(req, res));
    server.listen(process.env.PORT, () =>
      console.log(`App started at http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => {
    console.error(err);
    process.exit();
  });
