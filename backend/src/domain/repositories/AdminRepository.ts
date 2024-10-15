// backend\src\domain\repositories\AdminRepository.ts
import { IAdminRepository } from './interfaces/IAdminRepository';
import AdminModel,{ AdminDocument } from '../../infrastructure/models/AdminModel';
import { Admin } from '../../domain/entities/Admin';

export class AdminRepository implements IAdminRepository {
    
    // Create a new Admin
    async create(admin: Admin): Promise<Admin> {
        const newAdmin = new AdminModel(admin);
        const savedAdmin = await newAdmin.save();
        return this.mapDocumentToEntity(savedAdmin);
    }

    // Find an Admin by ID
    async findById(id: string): Promise<Admin | null> {
        const adminDocument = await AdminModel.findById(id).exec();
        return adminDocument ? this.mapDocumentToEntity(adminDocument) : null;
    }

    // Find an Admin by email
    async findByEmail(email: string): Promise<Admin | null> {
        const adminDocument = await AdminModel.findOne({ email }).exec();
        return adminDocument ? this.mapDocumentToEntity(adminDocument) : null;
    }

    // Update an Admin by ID
    async update(id: string, admin: Partial<Admin>): Promise<Admin | null> {
        const updatedAdmin = await AdminModel.findByIdAndUpdate(id, admin, { new: true }).exec();
        return updatedAdmin ? this.mapDocumentToEntity(updatedAdmin) : null;
    }

    // Delete an Admin by ID
    async delete(id: string): Promise<boolean> {
        const result = await AdminModel.findByIdAndDelete(id).exec();
        return !!result;
    }

    // Utility method to map Mongoose Document to the Admin entity
    private mapDocumentToEntity(adminDocument: AdminDocument): Admin {
        return {
            id: adminDocument._id.toString(),
            name: adminDocument.name,
            email: adminDocument.email,
            password: adminDocument.password,
        };
    }
}
