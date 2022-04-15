import { Pool } from "pg";

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://yourwebsite.com';
export const dbhost = dev ? 'localhost' : 'url-shortener-db';
export const dbport = dev ? 5433 : 5432;