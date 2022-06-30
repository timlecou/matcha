import { Service } from 'typedi';
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
}