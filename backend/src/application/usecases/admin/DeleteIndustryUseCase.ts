import { ICategoryRepository } from '../../../domain/repositories/interfaces/ICategoryRepository';

export class DeleteIndustryUseCase {
    constructor(private categoryRepo: ICategoryRepository) {}

    async execute(industryId: string): Promise<string> {
        const industry = await this.categoryRepo.findByIdAndRemove(industryId);

        if (!industry) throw new Error('Industry Not Found');
        
        return 'Industry Removed Successfully';
    }
}
