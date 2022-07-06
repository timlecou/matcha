import { Request } from 'express';
import { Service } from 'typedi';
import { ForbiddenException } from '../exceptions/Forbidden.exception';
import { UpdateProfileDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Service()
export class UserController
{
	constructor(private user_service: UserService)
	{
		
	}

	async getAllUsers() : Promise<User[]>
	{
		const users = await this.user_service.getAllUsers();
		return users;
	}

	async removeAllUsers(): Promise<Object>
	{
		await this.user_service.removeAllUsers();
		return {users: []};
	}

	async updateUser(req: Request): Promise<User>
	{
		const user = await this.user_service.getUser(req.user_id);
		if (user === null)
			throw new ForbiddenException("User not found");

		const user_dto = req.body as UpdateProfileDTO;
		for (let property of Object.getOwnPropertyNames(user_dto))
			user[property as keyof User] = req.body[property];

		await this.user_service.updateUserProfile(user);

		return user;
	}
}