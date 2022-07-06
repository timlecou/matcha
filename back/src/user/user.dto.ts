import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateProfileDTO
{
	@Expose()
	@IsDefined()
	@IsNotEmpty()
	first_name: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	last_name: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	username: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	@IsEmail()
	email: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	tel: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	biography: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	@IsString()
	@Length(1, 1)
	gender: String;

	@Expose()
	@IsDefined()
	@IsNotEmpty()
	@IsString()
	@Length(1, 1)
	sexual_orientation: String;
}