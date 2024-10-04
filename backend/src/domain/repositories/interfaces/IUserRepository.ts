// backend\src\domain\repositories\interfaces\IUserRepository.ts
import { User } from '../../entities/User';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserByPhone(phone: number): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
}
