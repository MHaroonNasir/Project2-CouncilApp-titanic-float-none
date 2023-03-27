const express = require('express');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(express.json());

const accountRoute = require('./routes/accountRoute');
const postRouter = require('./routes/postRoutes');

api.use("/posts", postRouter);
api.use("/account", accountRoute);

module.exports = api;
