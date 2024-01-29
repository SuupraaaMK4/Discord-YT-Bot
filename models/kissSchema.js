const mongoose = require('mongoose')

const kissdb = new mongoose.Schema({
    usersID: { type: String, require: true, unique: true },
    kissCount: { type: Number, require: true }
})

const model = mongoose.model("kisses", kissdb)

module.exports = model;