// backend\src\application\usecases\admin\BlockCompanyUseCase.ts
import { ICompanyRepository } from '../../../domain/repositories/interfaces/ICompanyRepository';

export class BlockCompanyUseCase {
    private companyRepository: ICompanyRepository;

    constructor(companyRepository: ICompanyRepository) {
        this.companyRepository = companyRepository;
    }

    async execute(companyId: string): Promise<string | null> {
        const company = await this.companyRepository.updateCompany(companyId, { isBlocked: true });
        return company ? `Blocked ${company.name}` : null;
    }
}
