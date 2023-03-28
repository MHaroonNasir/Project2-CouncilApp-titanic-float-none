const express = require('express');
const cors = require('cors');

const api = express();
api.use(cors());
api.use(express.json());

const accountRoute = require('./routes/accountRoute');
const postRouter = require('./routes/postRoutes');

api.use("/account", accountRoute);
api.use("/posts", postRouter);

module.exports = api;
