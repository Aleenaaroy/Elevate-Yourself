// backend\src\domain\repositories\UserRepository.ts
import { IUserRepository } from './interfaces/IUserRepository';
import userModel, { UserDocument } from '../../infrastructure/models/UserModel';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = new userModel(user);
    await createdUser.save();
    return this.toDomain(createdUser);
  }

  async findUserById(id: string): Promise<User | null> {
    const userDocument = await userModel.findById(id);
    return userDocument ? this.toDomain(userDocument) : null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userDocument = await userModel.findOne({ email });
    return userDocument ? this.toDomain(userDocument) : null;
  }
  async findUserByPhone(phone: number): Promise<User | null> {
    const userDocument = await userModel.findOne({ phone });
    return userDocument ? this.toDomain(userDocument) : null;
}

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await userModel.findByIdAndUpdate(id, user, { new: true });
    return updatedUser ? this.toDomain(updatedUser) : null;
  }

  async deleteUser(id: string): Promise<void> {
    await userModel.findByIdAndDelete(id);
  }

  async getAllUsers(): Promise<User[]> {
    const users = await userModel.find();
    return users.map(user => this.toDomain(user));
  }

  private toDomain(userDocument: UserDocument): User {
    return {
      id: userDocument._id.toString(),
      name: userDocument.name,
      email: userDocument.email,
      phone: userDocument.phone,
      role: userDocument.role,
      password: userDocument.password,
      isBlocked: userDocument.isBlocked,
      location: userDocument.location,
      headline: userDocument.headline,
      skills: userDocument.skills,
      profileImage: userDocument.profileImage,
      education: userDocument.education,
      profession: userDocument.profession,
      resume: userDocument.resume,
      savedPosts: userDocument.savedPosts,
      pendingRequests: userDocument.pendingRequests,
      manageRequests: userDocument.manageRequests,
      connections: userDocument.connections,
      followingCompanies: userDocument.followingCompanies,
      appliedJobs: userDocument.appliedJobs,
      chatId: userDocument.chatId,
      createdOn: userDocument.createdOn
    };
  }
}
