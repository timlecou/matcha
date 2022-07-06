import { Request } from "express";
import { Service } from "typedi";
import { BadRequestException } from "../../exceptions/bad-request.exception";
import { UserService } from "../user.service";
import { ForbiddenException } from "../../exceptions/Forbidden.exception";
import { NotFoundException } from "../../exceptions/not-found.exception";
import { PhotoService } from "./photo.service";
@Service()
export class PhotoController
{
	constructor(private user_service: UserService, private photo_service: PhotoService)
	{

	}

	async getAllPhotos(request: Request)
	{
		const logged_user = await this.user_service.getUser(request.user_id);
		if (logged_user === null)
			throw new ForbiddenException("User not found");

		const user_id = parseInt(request.params.user_id) as Number;
		const user = await this.user_service.getUser(user_id);
		if (user === null)
			throw new NotFoundException("User not found");
	
		return await this.photo_service.getAllPhotos(user);
	}


	async addPhoto(request: Request)
	{
		const user = await this.user_service.getUser(request.user_id);
		if (user === null)
			throw new ForbiddenException("User not found");

		const user_id = parseInt(request.params.user_id) as Number;
		if (user_id !== user.id)
			throw new ForbiddenException("You can't add photo to this user");

		if (!request.file)
			throw new BadRequestException();

		if (await this.photo_service.getPhotosCount(user) >= 5)
			throw new ForbiddenException("You can't have more than 5 photos.");

		await this.photo_service.addPhoto(user, request.file.path);

		return this.photo_service.getAllPhotos(user);
	}

	async deletePhoto(request: Request)
	{
		const user = await this.user_service.getUser(request.user_id);
		if (user === null)
			throw new ForbiddenException("User not found");

		const user_id = parseInt(request.params.user_id) as Number;
		if (user_id !== user.id)
			throw new ForbiddenException("You can't delete photo to this user");

		const photo_id = parseInt(request.params.photo_id) as Number;
		const photo = await this.photo_service.getPhotoById(photo_id);
	
		if (photo === null)
			throw new NotFoundException("Photo not found");
	
		if (photo.user_id !== user.id)
			throw new ForbiddenException("You cannot delete this photo");
		
		await this.photo_service.deletePhoto(photo.id);
		return this.photo_service.getAllPhotos(user);
	}
}