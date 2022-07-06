import { plainToInstance } from "class-transformer";
import { Service } from "typedi";
import { DatabaseService } from "../../database/database.service";
import { User } from "../user.entity";
import { Photo } from "./photo.entity";

@Service()
export class PhotoRepository
{
	constructor(private database_service: DatabaseService)
	{

	}

	async getAllPhotos(user: User): Promise<Photo[]>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();

			pool.query('SELECT id, path FROM "Photo" WHERE user_id = $1', [user.id])
			.then(result =>
			{
				resolve(plainToInstance(Photo, result.rows));
			})
			.catch(reject);
		})
	}

	async createPhoto(photo: Photo): Promise<Photo>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();

			pool.query('INSERT INTO "Photo"(path, user_id) VALUES($1, $2) RETURNING id, path',
						[photo.path, photo.user_id])
			.then(result =>
			{
				resolve(plainToInstance(Photo, result.rows[0] as Object));
			})
			.catch(reject);
		})
	}

	async getPhotosCount(user_id: Number): Promise<Number>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();

			pool.query('SELECT COUNT(*) as "count" FROM "Photo" WHERE user_id = $1', [user_id])
			.then(result =>
			{
				resolve(result.rows[0].count as Number);
			})
			.catch(reject);
		})
	}

	async deletePhotos(photo_id: Number): Promise<void>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();

			pool.query('DELETE FROM "Photo" WHERE id=$1', [photo_id])
			.then(() => resolve())
			.catch(reject);
		})
	}

	async getPhotoById(photo_id: Number): Promise<Photo | null>
	{
		return new Promise((resolve, reject) =>
		{
			const pool = this.database_service.getPool();

			pool.query('SELECT id, path, user_id FROM "Photo" WHERE id=$1', [photo_id])
			.then(result =>
			{
				if (result.rowCount == 1)
					resolve(plainToInstance(Photo, result.rows[0] as Object))
				else
					resolve(null);
			})
			.catch(reject);
		})
	}
}