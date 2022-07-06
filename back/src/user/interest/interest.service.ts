import { Service } from "typedi";
import { Interest } from "./interest.entity";
import { InterestRepository } from "./interest.repository";

@Service()
export class InterestService
{
	constructor(private interest_repository: InterestRepository)
	{

	}

	async getInterestByName(name: String)
	{
		return await this.interest_repository.getInterestByName(name);
	}

	async createInterest(name: String): Promise<Interest>
	{
		const interest = new Interest(name);
		return await this.interest_repository.createInterest(interest);
	}
}