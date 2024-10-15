// backend\src\domain\repositories\CompanyRepository.ts
import { ICompanyRepository } from './interfaces/ICompanyRepository';
import companyModel, { CompanyDocument } from '../../infrastructure/models/CompanyModel';
import { Company } from '../../domain/entities/Company';
import mongoose from 'mongoose';

export class CompanyRepository implements ICompanyRepository {
  async findById(id: string): Promise<Company | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const companyDoc = await companyModel.findById(id).exec();
    return companyDoc ? this.toDomain(companyDoc) : null;
  }

  async findByEmail(email: string): Promise<Company | null> {
    const companyDoc = await companyModel.findOne({ email }).exec();
    return companyDoc ? this.toDomain(companyDoc) : null;
  }

  async createCompany(company: Company): Promise<Company> {
    const newCompany = new companyModel({
      ...company,
      _id: new mongoose.Types.ObjectId(), // Set a new ObjectId
    });
    const savedCompany = await newCompany.save();
    return this.toDomain(savedCompany);
  }

  async updateCompany(id: string, company: Partial<Company>): Promise<Company | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const updatedCompany = await companyModel.findByIdAndUpdate(id, company, {
      new: true,
    }).exec();
    return updatedCompany ? this.toDomain(updatedCompany) : null;
  }

  async deleteCompany(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await companyModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
  async findByIdAndUpdate(id: string, updateData: Partial<Company>, options?: any): Promise<Company | null> {
    const updatedCompany = await companyModel.findByIdAndUpdate(id, updateData, options);
    return updatedCompany ? this.toDomain(updatedCompany) : null;
  }

  async find(): Promise<Company[]> {  
    const companies = await companyModel.find().exec();  // Use exec() for consistency
    return companies.map(company => this.toDomain(company));  // Use toDomain for mapping
  }

  async findAll(): Promise<Company[]> {
    const companies = await companyModel.find().exec();  // Use exec() for consistency
    return companies.map(company => this.toDomain(company));  // Use toDomain for mapping
  }

  // Helper function to map the MongoDB document to the Company domain entity
  private toDomain(companyDoc: CompanyDocument): Company {
    return {
      id: companyDoc._id.toString(),
      name: companyDoc.name,
      email: companyDoc.email,
      phone: companyDoc.phone,
      role: companyDoc.role,
      password: companyDoc.password,
      isBlocked: companyDoc.isBlocked,
      verify: companyDoc.verify,
      location: companyDoc.location,
      headline: companyDoc.headline,
      profileImage: companyDoc.profileImage,
      savedPosts: companyDoc.savedPosts,
      followers: companyDoc.followers,
      followingCompanies: companyDoc.followingCompanies,
      createdOn: companyDoc.createdOn,
    };
  }
}
