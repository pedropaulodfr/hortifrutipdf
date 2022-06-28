// Conexão com o banco de dados cloud
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const pg = require('pg')
var client = new pg.Client({
    user: "lgqiozyjyftndk",
    password: "0267b876fdcc685779f53f9423ef577a2d7db13ebbc5ae76971cbb6885dd4e41",
    database: "d3c6g8fvd59oul",
    port: 5432,
    host: "ec2-52-3-2-245.compute-1.amazonaws.com",
    ssl: true,
    dialectOptions: {
        "ssl": {"require":true }
    }
}); 
module.exports = client

// Conexão com o banco de dados local

/*
const Client = require('pg').Client
const client = new Client({
    user: "postgres",
    password: "admin",
    host: "localhost",
    port: 5432,
    database: "hortifruti"
})
*/

