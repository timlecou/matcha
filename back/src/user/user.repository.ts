import { Service } from 'typedi';
import { DatabaseService } from '../database/database.service';
import { User } from './user.entity';
import { QueryResult } from 'pg';
import { plainToInstance } from 'class-transformer';
import { Interest } from './interest/interest.entity';

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
			.catch(reject);
		})
	}

	async getUserById(id: Number): Promise<User | null>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('SELECT id, username, email, first_name, last_name, birth_date, last_sign_in, location, gender, sexual_orientation, is_online, biography, score, is_activated FROM "User" WHERE id=$1',
						[id])
			.then(value =>
			{
				if (value.rowCount == 0)
					resolve(null);
				const plain_user : Object = value.rows[0];
				resolve(plainToInstance(User, plain_user));
			})
			.catch(reject);
		})
	}

	async removeAll(): Promise<void>
	{
		return new Promise<void>((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('DELETE FROM "User"')
			.then(() => resolve())
			.catch(reject);
		});
	}

	async updateUserProfile(user: User): Promise<void>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('UPDATE "User" SET username=$2, email=$3, first_name=$4, last_name=$5, gender=$6, sexual_orientation=$7, biography=$8 WHERE id=$1',
						[user.id, user.username, user.email, user.first_name, user.last_name, user.gender, user.sexual_orientation, user.biography])
			.then(() =>
			{
				resolve();
			})
			.catch(reject);
		})
	}

	async addInterestToUser(user: User, interest: Interest): Promise<void>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('INSERT INTO "Interest_User"(user_id, interest_id) VALUES($1, $2)',
						[user.id, interest.id])
			.then(() => resolve())
			.catch(reject);
		})
	}

	async getAllInterestsOfUser(user: User): Promise<Interest[]>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('SELECT  "Interest".id, "Interest".name FROM "Interest" LEFT JOIN "Interest_User" ON "Interest_User".interest_id = "Interest".id WHERE "Interest_User".user_id = $1', [user.id])
			.then(result =>
			{
				resolve(plainToInstance(Interest, result.rows));
			})
			.catch(reject);
		})
	}

	async removeInterestOfUser(user: User, interest: Interest): Promise<void>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();
			pool.query('DELETE FROM "Interest_User" WHERE user_id=$1 AND interest_id=$2',
						[user.id, interest.id])
			.then(() => resolve())
			.catch(reject);
		})
	}
}