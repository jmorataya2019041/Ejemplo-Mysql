const mysql = require('mysql');
const {promisify} = require('util')

const {database} = require('./keys')

//createPool: Tiene una especie de hilo, ejecuta cada tarea a la vez.
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY WAS CLOSED');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }
    if(connection){
        console.log('DB IS CONNECTED');
        return;
    }
});

//Promisify pool querys: Convirtiendo promesas en lo que antes era un callback
pool.query = promisify(pool.query);

module.exports = pool;