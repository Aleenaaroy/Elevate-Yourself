// backend\src\application\usecases\admin\AdminLoginUseCase.ts
import { IAdminRepository } from '../../../domain/repositories/interfaces/IAdminRepository';
import jwt from 'jsonwebtoken';
import { Admin } from '../../../domain/entities/Admin';

export class AdminLoginUseCase {
    private adminRepository: IAdminRepository;

    constructor(adminRepository: IAdminRepository) {
        this.adminRepository = adminRepository;
    }

    async execute(email: string, password: string): Promise<{ message?: string, token?: string, error?: string, adminData?: Partial<Admin> }> {
        const admin = await this.adminRepository.findByEmail(email);
        
        if (!admin || admin.password !== password) {
            return { error: 'Admin not found' };
        }

        const token = jwt.sign({ adminId: admin.id, adminEmail: admin.email }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

        return {
            message: 'Login Successful',
            token,
            adminData: { email: admin.email, id: admin.id }
        };
    }
}
