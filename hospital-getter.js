var { Client } = require('pg');
require('dotenv').config();

var client = new Client({
    user: process.env.USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    port: process.env.PORT
});
client.connect();

const query = {
    text: 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE
}

client.query(query)
  .then(res => console.log(res.rows))
  .catch(e => console.error(e.stack))
