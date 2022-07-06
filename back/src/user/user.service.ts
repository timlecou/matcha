import { Service } from 'typedi';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import bcrypt from 'bcrypt';
import { Interest } from './interest/interest.entity';

@Service()
export class UserService
{
	constructor(private user_repository: UserRepository) {}

	private hashPassword(pass: string): Promise<String>
	{
		return bcrypt.hash(pass, process.env.BCRYPT_SALT_SECRET as string);
	}

	getAllUsers(): Promise<User[]>
	{
		return this.user_repository.getAllUsers();
	}

	async createUser(username: String, email: String, first_name: String, last_name: String, password: String)
	{
		const hashed_password = await this.hashPassword(password as string);
		const user = new User(username, email, first_name, last_name, hashed_password);
		return this.user_repository.createUser(user);
	}

	async checkLogin(username: String, password: String)
	{
		password = await this.hashPassword(password as string);
		return new Promise<User | null>((resolve) =>
		{
			this.user_repository.getUserByEmailAndPassword(username, password)
			.then(user => resolve(user))
			.catch(() => resolve(null))
		})
	}

	async removeAllUsers()
	{
		return this.user_repository.removeAll();
	}

	async getUser(id: Number): Promise<User | null>
	{
		return this.user_repository.getUserById(id);
	}

	async updateUserProfile(user: User): Promise<void>
	{
		return this.user_repository.updateUserProfile(user);
	}

	async addInterestToUser(user: User, interest: Interest)
	{
		return this.user_repository.addInterestToUser(user, interest);
	}

	async getAllInterestsOfUser(user: User)
	{
		return this.user_repository.getAllInterestsOfUser(user);
	}

	async removeInterestOfUser(user: User, interest: Interest)
	{
		return this.user_repository.removeInterestOfUser(user, interest);
	}
};