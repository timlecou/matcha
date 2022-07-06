import { Expose } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class AddInterestDTO
{
	@Expose()
	@IsDefined()
	@IsNotEmpty()
	@IsString()
	name: String;
}