import { Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

function isPromise(func: any)
{
	return (func && typeof func.then === 'function' && func[Symbol.toStringTag] === 'Promise');
}

export function handleController(controller: any, method: any)
{
	return async (req: Request, res: Response, next: any): Promise<void> =>
	{
		try
		{
			let ret = method.call(controller, req, res);
			if (isPromise(ret))
				ret = await ret;
			res.json(ret);
			next();
		}
		catch (e)
		{
			if (e instanceof HttpException)
			{
				res.status(e.code as number);
				res.json({error: e.message});
			}
		}
	}
};