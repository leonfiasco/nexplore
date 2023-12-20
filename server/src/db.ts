import { Pool } from 'pg';

const pool = new Pool({
	user: 'leonboakye-adjei',
	password: '2468',
	host: 'localhost',
	port: 5432,
	database: 'nexploretodo',
});

export default pool;
