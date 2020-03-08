import {HospitalGetter} from './hospital-getter';
require('dotenv').config();
import {Hospital} from './hospital-getter';
import http, {IncomingMessage, ServerResponse} from 'http'

const hg = new HospitalGetter();

let dbHost: string = process.env.DB_HOST || '';
let dbUser: string = process.env.USER || '';
let dbPassword: string = process.env.PASSWORD || '';
let dbDatabase: string = process.env.DATABASE || '';

try {
  hg.connect(dbHost, dbUser, dbPassword, dbDatabase);
}catch(e){
  console.log("error");
}
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  let nowlon = 139.3374233
  let nowlat = 35.7110031
  let rows = hg.getNearHospital(nowlon, nowlat, 600.0);
  var res2 = res;
  rows.then((result:Hospital[]) => {return res2.end(JSON.stringify(result))}, (error) => {return res2.end(JSON.stringify(error.message))})
  // res2.end("ok")
})

server.listen(4000)
