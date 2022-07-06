import { Request } from "express";
import { Service } from "typedi";
import { BadRequestException } from "../../exceptions/bad-request.exception";
import { ForbiddenException } from "../../exceptions/Forbidden.exception";
import { UserService } from "../user.service";
import { AddInterestDTO } from "./interest.dto";
import { InterestService } from "./interest.service";

@Service()
export class InterestController
{
	constructor(private interest_service: InterestService, private user_service: UserService) {}

	async getAllInterest(request: Request)
	{
		if (request.user_id as number !== parseInt(request.params.user_id))
			throw new ForbiddenException("Bad user id");

		const user = await this.user_service.getUser(request.user_id);
		if (user === null)
			throw new ForbiddenException("User not found");

		return await this.user_service.getAllInterestsOfUser(user);
	}

	async addInterest(request: Request)
	{
		if (request.user_id as number !== parseInt(request.params.user_id))
			throw new ForbiddenException("Bad user id");

		const user = await this.user_service.getUser(request.user_id);
		if (user === null)
			throw new ForbiddenException("User not found");

		const dto = request.body as AddInterestDTO;
		dto.name = dto.name.toLowerCase();

		let interest = await this.interest_service.getInterestByName(dto.name);

		if (interest === null)
			interest = await this.interest_service.createInterest(dto.name);

		await this.user_service.addInterestToUser(user, interest);

		return {interest: interest};
	}

	async removeInterest(request: Request)
	{
		if (request.user_id as number !== parseInt(request.params.user_id))
			throw new ForbiddenException("Bad user id");

		const user = await this.user_service.getUser(request.user_id);
		if (user === null)
			throw new ForbiddenException("User not found");
		
		const interest = await this.interest_service.getInterestByName(request.params.interest_name as String);
		if (interest === null)
			throw new BadRequestException("Bad interest name");

		await this.user_service.removeInterestOfUser(user, interest);
		return await this.user_service.getAllInterestsOfUser(user);
	}
}