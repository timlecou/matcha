import { HttpException } from "./http-exception";

export class BadRequestException extends HttpException
{
	constructor(msg = "Bad request")
	{
		super(msg);
	}

	code = 400;
}