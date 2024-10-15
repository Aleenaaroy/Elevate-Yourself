import { ICompanyRepository } from '../../../domain/repositories/interfaces/ICompanyRepository';

export class GetCompaniesUseCase {
    constructor(private companyRepo: ICompanyRepository) {}

    async execute(): Promise<any> {
        const companies = await this.companyRepo.find();
        
        const sortedCompanies = companies.sort((a, b) => {
            return b.id.localeCompare(a.id); 
        });

        return sortedCompanies.length > 0 ? sortedCompanies : null;
    }
}
