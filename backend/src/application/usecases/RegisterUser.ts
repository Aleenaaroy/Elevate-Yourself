import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import bcrypt from 'bcrypt';

export class RegisterUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    public async execute(userData: User): Promise<User> {
        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const userToSave: User = {
            ...userData,
            password: hashedPassword // save the hashed password
        };

        const newUser = await this.userRepository.createUser(userToSave);
        return newUser;
    }
}
