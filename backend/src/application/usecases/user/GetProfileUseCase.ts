import { UserRepository } from '../../../domain/repositories/UserRepository';
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository';

export class GetProfileUseCase {
    private userRepository: UserRepository;
    private companyRepository: CompanyRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.companyRepository = new CompanyRepository();
    }

    async execute(id: string) {
        let user = await this.userRepository.findUserById(id);
        if (!user) {
            user = await this.companyRepository.findCompanyById(id);
        }

        if (!user) {
            return { error: 'Profile not found' };
        }

        return { user };
    }
}
