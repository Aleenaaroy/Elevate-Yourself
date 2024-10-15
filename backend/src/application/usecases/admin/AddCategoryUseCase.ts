import { ICategoryRepository } from '../../../domain/repositories/interfaces/ICategoryRepository';

export class AddCategoryUseCase {
    constructor(private categoryRepo: ICategoryRepository) {}

    async execute(industry: string): Promise<any> {
        const existingIndustry = await this.categoryRepo.findOne({ industry: { $regex: `^${industry}$`, $options: 'i' } });

        if (existingIndustry) throw new Error('Industry Already Exists');
        if (/\d/.test(industry)) throw new Error('Invalid Entry!');

        const newIndustry = await this.categoryRepo.create({ industry });
        return newIndustry;
    }
}
