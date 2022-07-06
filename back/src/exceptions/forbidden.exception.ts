import { HttpException } from "./http-exception";

export class ForbiddenException extends HttpException
{
	constructor(msg: string = "")
	{
		super(msg);
	}

	code = 403;
}