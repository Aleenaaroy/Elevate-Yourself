//backend\src\application\usecases\RegisterUser.ts
import { User } from '../../domain/entities/User';
import { Company } from '../../domain/entities/Company';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { ICompanyRepository } from '../../domain/repositories/ICompanyRepository';
import bcrypt from 'bcrypt';

export class RegisterUserUseCase {
    constructor(private userRepository: IUserRepository, private companyRepository: ICompanyRepository) {}

    // Type guard to check if userData is a Company
    private isCompany(userData: User | Company): userData is Company {
        return (userData as Company).role === 'Company';
    }

    public async execute(userData: User | Company): Promise<User | Company> {
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        if (this.isCompany(userData)) {
            const companyToSave: Company = {
                ...userData,
                password: hashedPassword, // save the hashed password
            };
            const newCompany = await this.companyRepository.createCompany(companyToSave);
            return newCompany;
        }

        const userToSave: User = {
            ...userData,
            password: hashedPassword, // save the hashed password
        };

        const newUser = await this.userRepository.createUser(userToSave);
        return newUser;
    }
}
