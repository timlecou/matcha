import { plainToInstance } from "class-transformer";
import { Request } from "express";
import { Service } from "typedi";
import { UnauthorizedException } from "../exceptions/Unauthorized.exception";
import { UserService } from "../user/user.service";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import jwt from 'jsonwebtoken';
import { User } from "../user/user.entity";

const JWT_SECRET = process.env.JWT_SECRET;

@Service()
export class AuthController
{
	constructor(private user_service: UserService) {}

	async register(req: Request)
	{
		const user = plainToInstance(RegisterDTO, req.body);
		return await this.user_service.createUser(user.username, user.email, user.first_name, user.last_name, user.password);
	}

	async login(req: Request)
	{
		return new Promise((resolve, reject) =>
		{
			const login_dto = plainToInstance(LoginDTO, req.body);
			this.user_service.checkLogin(login_dto.email, login_dto.password)
			.then((user: User | null) =>
			{
				if (user === null)
					reject(new UnauthorizedException("Bad credentials"));

				user = user as User;
				const access_token = jwt.sign({user_id: user.id}, JWT_SECRET as string);
				resolve({access_token});
			})
			.catch(reject);
		})
	}
}