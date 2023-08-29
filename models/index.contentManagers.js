const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db7 = {};
db7.mongoose = mongoose;
db7.url = dbConfig.url;
db7.contentManagers = require("./contentManagers.model.js")(mongoose);

module.exports = db7;