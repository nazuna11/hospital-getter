import { Client } from 'pg';

export interface Hospital {
  name: string,
  parse_source: string,
  address: string,
  tell: string,
  lon: number,
  lat: number,
  homepage: string
}

export class HospitalGetter{
  private client!: Client;

  public connect(host: string, user: string, password: string, database: string){
    this.client = new Client({
      host: host,
      user: user,
      password: password,
      database: database
    });
    return this.client.connect();
  }

  public query(query: string, parameters: any[] = []){
    return this.client.query(query, parameters);
  }

  public getHospital(): Promise<Hospital[]>{
    const query: string = 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE;
    const rows = this.query(query);
    return rows.then(result => result.rows).catch(reason => reason);
    // rows.then(function(resolve:Hospital[]) {return resolve});
  }

  public getNearHospital(lon: number, lat: number, dist: number): Promise<Hospital[]>{
    const query: string = 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE +' WHERE st_distance(st_point(lon, lat)::geography, st_point('+lon+','+lat+')::geography) < '+dist+';'
    const rows = this.query(query);
    return rows.then(result => result.rows).catch(reason => reason);
  }

  public end(){
    this.client.end();
  }
}
