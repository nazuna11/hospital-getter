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

  public async connect(host: string, user: string, password: string, database: string){
    this.client = new Client({
      host: host,
      user: user,
      password: password,
      database: database
    });
    await this.client.connect();
  }

  public async query(query: string, parameters: any[] = []){
    return (await this.client.query(query, parameters)).rows;
  }

  public getHospital(): Promise<Hospital[]>{
    const query: string = 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE;
    const rows = this.query(query);
    return rows;
    // rows.then(function(resolve:Hospital[]) {return resolve});
  }

  public getNearHospital(lon: number, lat: number, dist: number): Promise<Hospital[]>{
    const query: string = 'SELECT * FROM '+process.env.SCHEMA+'.'+process.env.TABLE +' WHERE st_distance(st_point(lon, lat)::geography, st_point('+lon+','+lat+')::geography) < '+dist+';'
    const rows = this.query(query);
    return rows;
  }

  public async end(){
    await this.client.end();
  }
}
