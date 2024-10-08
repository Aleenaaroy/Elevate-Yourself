import { UserRepository } from '../../../domain/repositories/UserRepository';

export class ListAllUsersUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute() {
        const users = await this.userRepository.getAllUsers();
        return { users };
    }
}
