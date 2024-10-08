import { CompanyRepository } from '../../../domain/repositories/CompanyRepository';

export class ListCompaniesUseCase {
    private companyRepository: CompanyRepository;

    constructor() {
        this.companyRepository = new CompanyRepository();
    }

    async execute() {
        const companies = await this.companyRepository.getAllCompanies();
        return { companies };
    }
}
