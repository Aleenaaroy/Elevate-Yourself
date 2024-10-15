import { IUserRepository } from '../../../domain/repositories/interfaces/IUserRepository';

export class GetUsersUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(): Promise<any> {
        const users = await this.userRepo.find(); 
        const sortedUsers = users.sort((a, b) => b.id!.localeCompare(a.id!)); 
              return sortedUsers.length > 0 ? sortedUsers : null;
    }
}
