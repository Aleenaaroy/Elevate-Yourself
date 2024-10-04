// src/infrastructure/repositories/AdminRepository.ts
import { IAdminRepository } from './interfaces/IAdminRepository';
import adminModel, { AdminDocument } from '../../infrastructure/models/AdminModel';
import { Admin } from '../../domain/entities/Admin';

export class AdminRepository implements IAdminRepository {
  async createAdmin(admin: Admin): Promise<Admin> {
    const createdAdmin = new adminModel(admin);
    await createdAdmin.save();
    return this.toDomain(createdAdmin);
  }

  async findAdminById(id: string): Promise<Admin | null> {
    const adminDocument = await adminModel.findById(id);
    return adminDocument ? this.toDomain(adminDocument) : null;
  }

  async findAdminByEmail(email: string): Promise<Admin | null> {
    const adminDocument = await adminModel.findOne({ email });
    return adminDocument ? this.toDomain(adminDocument) : null;
  }

  async updateAdmin(id: string, admin: Partial<Admin>): Promise<Admin | null> {
    const updatedAdmin = await adminModel.findByIdAndUpdate(id, admin, { new: true });
    return updatedAdmin ? this.toDomain(updatedAdmin) : null;
  }

  async deleteAdmin(id: string): Promise<void> {
    await adminModel.findByIdAndDelete(id);
  }

  async getAllAdmins(): Promise<Admin[]> {
    const admins = await adminModel.find();
    return admins.map(admin => this.toDomain(admin));
  }

  private toDomain(adminDocument: AdminDocument): Admin {
    return {
      id: adminDocument._id.toString(),
      name: adminDocument.name,
      email: adminDocument.email,
      password: adminDocument.password
    };
  }
}
