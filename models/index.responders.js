const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db6 = {};
db6.mongoose = mongoose;
db6.url = dbConfig.url;
db6.responders = require("./responder.model.js")(mongoose);

module.exports = db6;