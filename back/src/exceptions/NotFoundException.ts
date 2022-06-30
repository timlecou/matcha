import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException
{
	constructor(msg = "Not found")
	{
		super(msg)
	}

	code = 400;
}