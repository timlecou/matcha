import { HttpException } from "./http-exception";

export class InternalServerError extends HttpException
{
	constructor(msg: string)
	{
		super(msg);
	}
	
	code = 500;
}