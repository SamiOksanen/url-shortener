import { Pool } from "pg";
import { dbhost, dbport } from "../config";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: 'urlshortener',
    password: 'urlshortener',
    host: dbhost,
    port: dbport,
    database: 'urlshortener',
  });
}

export default conn;