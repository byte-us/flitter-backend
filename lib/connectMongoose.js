'use strict';
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// handles errors that might occur while connecting to DB
mongoose.connection.on('error',err => {
    console.log('Error de conexión a MongoDB',err);
    process.exit(1); 
});

// emits an event when the connection to DB is successful
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connect('mongodb://127.0.0.1/flitterApp')  

module.exports = mongoose.connection;