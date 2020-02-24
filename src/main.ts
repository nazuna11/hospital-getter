import {HospitalGetter} from './hospital-getter';
require('dotenv').config();
import {Hospital} from './hospital-getter';

const hg = new HospitalGetter();

let dbHost: string = process.env.DB_HOST || '';
let dbUser: string = process.env.USER || '';
let dbPassword: string = process.env.PASSWORD || '';
let dbDatabase: string = process.env.DATABASE || '';

hg.connect(dbHost, dbUser, dbPassword, dbDatabase);
let nowlon = 139.3374233
let nowlat = 35.7110031
let rows = hg.getNearHospital(nowlon, nowlat, 600.0);
rows.then(function(resolve:Hospital[]) {console.log(resolve[0])});
