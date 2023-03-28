const express = require('express');
const cors = require('cors');

const logRoutes = require('./middleware/logger');
const accountRoute = require('./routes/accountRoute');
const postRouter = require('./routes/postRoutes');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.use("/posts", postRouter);
api.use("/account", accountRoute);

module.exports = api;
