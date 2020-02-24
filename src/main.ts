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
  hg.connect(dbHost, dbUser, dbPassword, dbDatabase);
  const query: string = 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE;
  const rows = hg.query(query);
  return rows;
  // rows.then(function(resolve:Hospital[]) {return resolve});
}

function getNearHospital(lon: number, lat: number, dist: number): Promise<Hospital[]>{
  hg.connect(dbHost, dbUser, dbPassword, dbDatabase);
  const query: string = 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE +' WHERE st_distance(st_point(lon, lat)::geography, st_point('+lon+','+lat+')::geography) < '+dist+';'
  const rows = hg.query(query);
  return rows;
  // rows.then(function(resolve:Hospital[]) {return resolve});
}

let nowlon = 139.3374233
let nowlat = 35.7110031
let rows = getNearHospital(nowlon, nowlat, 600.0);
rows.then(function(resolve:Hospital[]) {console.log(resolve[0])});
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
