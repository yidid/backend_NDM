const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db4 = {};
db4.mongoose = mongoose;
db4.url = dbConfig.url;
db4.materials = require("./material.model.js")(mongoose);

module.exports = db4;