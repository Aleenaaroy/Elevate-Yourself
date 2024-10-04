// src/domain/repositories/IAdminRepository.ts
import { Admin } from '../../entities/Admin';

export interface IAdminRepository {
  createAdmin(admin: Admin): Promise<Admin>;
  findAdminById(id: string): Promise<Admin | null>;
  findAdminByEmail(email: string): Promise<Admin | null>;
  updateAdmin(id: string, admin: Partial<Admin>): Promise<Admin | null>;
  deleteAdmin(id: string): Promise<void>;
  getAllAdmins(): Promise<Admin[]>;
}
