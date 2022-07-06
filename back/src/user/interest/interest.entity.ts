import { User } from "../user.entity";

export class Interest
{
	constructor(name: String= "")
	{
		this.name = name;
	}

	id: Number;
	name: String;
	user: User;
}