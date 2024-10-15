// backend\src\application\usecases\admin\UnblockCompanyUseCase.ts
import { ICompanyRepository } from '../../../domain/repositories/interfaces/ICompanyRepository';

export class UnblockCompanyUseCase {
    private companyRepository: ICompanyRepository;

    constructor(companyRepository: ICompanyRepository) {
        this.companyRepository = companyRepository;
    }

    async execute(companyId: string): Promise<string | null> {
        const company = await this.companyRepository.updateCompany(companyId, { isBlocked: false });
        return company ? `Unblocked ${company.name}` : null;
    }
}
