// backend\src\domain\repositories\interfaces\IUserRepository.ts
import { User } from '../../entities/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
  find(): Promise<User[]>;
}
