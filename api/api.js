const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/postRoutes');

const api = express();

api.use(cors());
api.use(express.json());

api.use("/posts", postRouter);

module.exports = api;