const express = require("express");
const application = express();

application.use(express.json())

module.exports = application