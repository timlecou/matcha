import { plainToInstance } from "class-transformer";
import { Service } from "typedi";
import { DatabaseService } from "../../database/database.service";
import { Interest } from "./interest.entity";

@Service()
export class InterestRepository
{
	constructor(private database_service: DatabaseService)
	{

	}

	async getAll(): Promise<Interest[]>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('SELECT * FROM "Interest"')
			.then(result =>
			{
				resolve(plainToInstance(Interest, result.rows));
			})
			.catch(reject);
		})
	}

	async getInterestByName(name: String): Promise<Interest | null>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('SELECT * FROM "Interest" WHERE name=$1', [name])
			.then(result =>
			{
				if (result.rowCount == 0)
					resolve(null);
				else
					resolve(plainToInstance(Interest, <Interest>result.rows[0]));
			})
			.catch(reject);
		})
	}

	async createInterest(interest: Interest): Promise<Interest>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('INSERT INTO "Interest"(name) VALUES($1) RETURNING id', [interest.name])
			.then(result =>
			{
				interest.id = result.rows[0].id as Number;
				resolve(interest);
			})
			.catch(reject);
		});
	}
}