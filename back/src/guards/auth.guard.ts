import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function AuthGuard(req: Request, res: Response, next: any)
{
	const auth_header = req.headers.authorization;
	if (auth_header)
	{
		const token = auth_header.split(' ')[1];
		jwt.verify(token, JWT_SECRET as string,  (err, payload) =>
		{
			if (err)
				res.sendStatus(403);
			else
			{
				req.user_id = (<JwtPayload>payload).user_id as Number;
				next();
			}
		})
	}
	else
		res.sendStatus(401);
}