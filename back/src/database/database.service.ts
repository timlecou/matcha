import { Service } from 'typedi';
import { Pool } from 'pg';

@Service()
export class DatabaseService
{
	pool : Pool = null;
	constructor()
	{
		this.pool = new Pool({
			user: process.env.PGUSER,
			host: process.env.PGHOST,
			database: process.env.PGDATABASE,
			password: process.env.PGPASSWORD,
			port: 5432,
		})
	}
}