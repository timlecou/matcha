import { HttpException } from "./http-exception";

export class UnauthorizedException extends HttpException
{
	constructor(msg = "Not found")
	{
		super(msg)
	}

	code = 401;
}