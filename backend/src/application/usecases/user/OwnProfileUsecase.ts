//backend\src\application\usecases\user\OwnProfileUsecase.ts
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository';

export class OwnProfileUseCase {
    private userRepository: UserRepository;
    private companyRepository: CompanyRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.companyRepository = new CompanyRepository();
    }

    async execute(userId: string) {
        let user = await this.userRepository.findUserById(userId);
        if (!user) {
            user = await this.companyRepository.findCompanyById(userId);
        }

        if (!user) {
            return { error: 'User not found' };
        }

        return { user };
    }
}
