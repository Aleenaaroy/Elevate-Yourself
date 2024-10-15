// backend\src\domain\repositories\UserRepository.ts
import { IUserRepository } from './interfaces/IUserRepository';
import userModel, { UserDocument } from '../../infrastructure/models/UserModel';
import { User } from '../../domain/entities/User';
import mongoose from 'mongoose';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const userDoc = await userModel.findById(id).exec();
    return userDoc ? this.toDomain(userDoc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await userModel.findOne({ email }).exec();
    return userDoc ? this.toDomain(userDoc) : null;
  }

  async createUser(user: User): Promise<User> {
    const newUser = new userModel({
      ...user,
      _id: new mongoose.Types.ObjectId(), // Set a new ObjectId
    });
    const savedUser = await newUser.save();
    return this.toDomain(savedUser);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const updatedUser = await userModel.findByIdAndUpdate(id, user, {
      new: true,
    }).exec();
    return updatedUser ? this.toDomain(updatedUser) : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    const result = await userModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  // Implement the find() method to return all users
  async find(): Promise<User[]> {
    const userDocs = await userModel.find().exec();
    return userDocs.map((userDoc) => this.toDomain(userDoc));
  }

  // Helper function to map the MongoDB document to the User domain entity
  private toDomain(userDoc: UserDocument): User {
    return {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      phone: userDoc.phone,
      role: userDoc.role,
      password: userDoc.password,
      isBlocked: userDoc.isBlocked,
      location: userDoc.location,
      headline: userDoc.headline,
      skills: userDoc.skills,
      profileImage: userDoc.profileImage,
      education: userDoc.education,
      profession: userDoc.profession,
      resume: userDoc.resume,
      savedPosts: userDoc.savedPosts,
      pendingRequests: userDoc.pendingRequests,
      manageRequests: userDoc.manageRequests,
      connections: userDoc.connections,
      followingCompanies: userDoc.followingCompanies,
      appliedJobs: userDoc.appliedJobs,
      chatId: userDoc.chatId?.toString(),
      createdOn: userDoc.createdOn,
    };
  }
}
