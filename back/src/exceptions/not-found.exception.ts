import { HttpException } from "./http-exception";

export class NotFoundException extends HttpException
{
	constructor(msg = "Not found")
	{
		super(msg)
	}

	code = 400;
}