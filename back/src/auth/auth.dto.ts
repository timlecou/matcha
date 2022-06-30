import { Expose } from "class-transformer";
import { IsAlpha, IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDTO
{
	@Expose()
	@IsDefined()
	@IsNotEmpty()
	username: String;

	@Expose()
	@IsEmail()
	@IsDefined()
	email: String;

	@Expose()
	@IsDefined()
	@IsAlpha()
	@IsNotEmpty()
	first_name: String;

	@Expose()
	@IsDefined()
	@IsAlpha()
	@IsNotEmpty()
	last_name: String;

	@IsDefined()
	@IsNotEmpty()
	password: String;
}

export class LoginDTO
{
	@Expose()
	@IsEmail()
	@IsDefined()
	email: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	password: String;
}