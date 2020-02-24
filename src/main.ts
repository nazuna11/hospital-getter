import {HospitalGetter} from './hospital-getter';
require('dotenv').config();

interface Hospital {
  name: string,
  parse_source: string,
  address: string,
  tell: string,
  lon: number,
  lat: number,
  homepage: string
}

const hg = new HospitalGetter();

let dbHost: string = process.env.DB_HOST || '';
let dbUser: string = process.env.USER || '';
let dbPassword: string = process.env.PASSWORD || '';
let dbDatabase: string = process.env.DATABASE || '';

function getHospital(): Promise<Hospital[]>{
  hg.connect(db_host, db_user, db_password, db_database);
  const query: string = 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE;
  const rows = hg.query(query);
  return rows;
  // rows.then(function(resolve:Hospital[]) {return resolve});
}

// let rows = getHospital()
// rows.then(function(resolve:Hospital[]) {console.log(resolve[0].name)});
/*
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

*/
