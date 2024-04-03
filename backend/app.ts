const helmet = require("helmet");
const express = require("express");
const application = express();

application.use(helmet());
application.use(express.json());

module.exports = application;
