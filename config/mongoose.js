const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://srivastavaapoorva104:apoorva123@cluster0.7cn33kj.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error"));

db.once('open', function () {
    console.log('Connected to Db')
})

module.exports = db;