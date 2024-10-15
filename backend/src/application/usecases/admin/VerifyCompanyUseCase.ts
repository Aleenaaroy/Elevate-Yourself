import { ICompanyRepository } from '../../../domain/repositories/interfaces/ICompanyRepository';

export class VerifyCompanyUseCase {
    constructor(private companyRepo: ICompanyRepository) {}

    async execute(companyId: string): Promise<string> {
        if (!companyId) throw new Error('Company ID is required');

        const updatedCompany = await this.companyRepo.findByIdAndUpdate(companyId, { verify: true }, { new: true });

        if (!updatedCompany) throw new Error('Company not found');

        return 'Verified Successfully';
    }
}
