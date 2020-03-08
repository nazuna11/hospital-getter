import {HospitalGetter} from './hospital-getter';
require('dotenv').config();
import {Hospital} from './hospital-getter';
import http, {IncomingMessage, ServerResponse} from 'http'
import * as url from 'url'

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
  if(req.method!="GET"){
    res.statusCode = 400;
    res.end('bad');
  }else{
    var nowlon = 139.3374233
    var nowlat = 35.7110031
    var default_radius = 600.0
    var res2 = res;
    var qstr:string;
    if(typeof req.url == "string"){
      qstr=req.url;
      let param = url.parse(qstr, true).query;
      var radius = 'radius' in param ? Number(param.radius) : default_radius
      if('lon' in param && 'lat' in param){
        let rows = hg.getNearHospital(Number(param.lon), Number(param.lat), radius);
        res2.setHeader('Content-type', 'application/json');
        rows.then((result:Hospital[]) => {
          res2.statusCode = 200;
          return res2.end(JSON.stringify(result), 'utf-8')
        },
        (error) => {
          res2.statusCode = 400;
          return res2.end(JSON.stringify(error.message))
        })
      }else{
        res2.statusCode = 400;
        return res2.end("no param")
      }
    }
  }
  // res2.end("ok")
})

server.listen(4000)
