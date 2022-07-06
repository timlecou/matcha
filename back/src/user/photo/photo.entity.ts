export class Photo
{
	constructor(path: String = '', user_id: Number)
	{
		this.path = path;
		this.user_id = user_id;
	}

	id: Number;
	path: String;
	user_id: Number;
}