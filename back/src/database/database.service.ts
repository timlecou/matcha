import { Pool } from 'pg';
import { Service } from 'typedi';

@Service()
export class DatabaseService
{
	private pool : any;

	constructor()
	{
		this.pool = new Pool();
	}

	getPool(): Pool
	{
		return this.pool;
	}
}