import { Response } from 'express';
import { Service } from 'typedi';

@Service()
export class UserController
{
	constructor()
	{
		
	}

	getAllUsers(res: Response) : void
	{
		res.json({message: "Success"})
	}
}