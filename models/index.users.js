const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db5 = {};
db5.mongoose = mongoose;
db5.url = dbConfig.url;
db5.users = require("./user.models.js")(mongoose);

module.exports = db5;