import { Service } from "typedi";
import { User } from "../user.entity";
import { Photo } from "./photo.entity";
import { PhotoRepository } from "./photo.repository";

@Service()
export class PhotoService
{
	constructor(private photo_repository: PhotoRepository)
	{

	}
	
	async getAllPhotos(user: User)
	{
		return await this.photo_repository.getAllPhotos(user);
	}

	async addPhoto(user: User, path: String): Promise<Photo>
	{
		const photo = new Photo(path, user.id);
		return await this.photo_repository.createPhoto(photo);
	}

	async getPhotosCount(user: User): Promise<Number>
	{
		return await this.photo_repository.getPhotosCount(user.id);
	}

	async deletePhoto(photo_id: Number)
	{
		return await this.photo_repository.deletePhotos(photo_id);
	}

	async getPhotoById(photo_id: Number): Promise<Photo | null>
	{
		return await this.photo_repository.getPhotoById(photo_id);
	}
}