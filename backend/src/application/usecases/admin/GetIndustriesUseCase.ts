import { ICategoryRepository } from '../../../domain/repositories/interfaces/ICategoryRepository';

export class GetIndustriesUseCase {
    constructor(private categoryRepo: ICategoryRepository) {}

    async execute(): Promise<any> {
        const industries = await this.categoryRepo.find();

        const sortedIndustries = industries.sort((a, b) => {
            const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
            const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
            return dateB - dateA;  
        });

        return sortedIndustries.length > 0 ? sortedIndustries : null;
    }
}
