import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

class Database {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });
    }

    async query(text, params) {
        return await this.pool.query(text, params);
    }
}

export default new Database();