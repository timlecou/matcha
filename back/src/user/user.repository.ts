import { Service } from 'typedi';
import { DatabaseService } from '../database/database.service';
import { User } from './user.entity';
import { QueryResult } from 'pg';
import { plainToInstance } from 'class-transformer';

@Service()
export class UserRepository
{
	constructor(private database_service: DatabaseService)
	{
		
	}

	async getAllUsers(): Promise<User[]>
	{
		return new Promise((resolve, reject) =>
		{
			this.database_service.getPool().query('SELECT * FROM public."User"')
			.then((res: QueryResult) =>
			{
				const users = res.rows as User[];
				resolve(plainToInstance(User, users));
			})
			.catch(reject)
		})
	}

	async createUser(user: User): Promise<User>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('INSERT INTO "User" (email, username, first_name, last_name, password, location, score) VALUES($1, $2, $3, $4, $5, $6, $7)',
						[user.email, user.username, user.first_name, user.last_name, user.password, "(0, 0)", 0])
			.then(() => resolve(user))
			.catch(reject);
		})
	}

	async getUserByEmailAndPassword(email: String, password: String): Promise<User>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('SELECT id, username, email, first_name, last_name, birth_date, last_sign_in, location, gender, sexual_orientation, is_online, biography, score, is_activated FROM "User" WHERE email=$1 AND password=$2',
						[email, password])
			.then(value =>
			{
				if (value.rowCount == 0)
					reject();
				const plain_user : Object = value.rows[0];
				resolve(plainToInstance(User, plain_user));
			})
		})
	}
}