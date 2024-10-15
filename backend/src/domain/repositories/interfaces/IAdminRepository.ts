// backend\src\domain\repositories\interfaces\IAdminRepository.ts
import { Admin } from '../../entities/Admin';

export interface IAdminRepository {
    create(admin: Admin): Promise<Admin>;
    findById(id: string): Promise<Admin | null>;
    findByEmail(email: string): Promise<Admin | null>;
    update(id: string, admin: Partial<Admin>): Promise<Admin | null>;
    delete(id: string): Promise<boolean>;
}
