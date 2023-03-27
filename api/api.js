const express = require('express');
const cors = require('cors');

const accountRoute = require('./routes/accountRoute');

const api = express();
api.use(cors());
api.use(express.json());

api.use("/account", accountRoute);

module.exports = api;
