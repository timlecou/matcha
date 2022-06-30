import { plainToInstance } from "class-transformer";
import { validate } from "class-validator"
import { Request, Response } from "express";

export const validateBody = (dto: any) => async (req: Request, res: Response, next: any) =>
{
	const obj = plainToInstance(dto, req.body);
	validate(obj).then(errors =>
	{
		if (errors.length > 0)
			res.status(400).json({errors: errors.map(e => e.toString())});
		else
			next();
	});
}