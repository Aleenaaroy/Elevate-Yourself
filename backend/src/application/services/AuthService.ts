//backend\src\application\services\AuthService.ts
import { IUserRepository } from '../../domain/repositories/interfaces/IUserRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    constructor(private userRepository: IUserRepository) {}

    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'secretKey', // Use a secret key from env
            { expiresIn: '1h' }
        );

        return token;
    }
}