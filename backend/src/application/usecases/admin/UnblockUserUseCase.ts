// backend\src\application\usecases\admin\UnblockUserUseCase.ts
import { IUserRepository } from '../../../domain/repositories/interfaces/IUserRepository';

export class UnblockUserUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<string | null> {
        const user = await this.userRepository.updateUser(userId, { isBlocked: false });
        return user ? `Unblocked ${user.name}` : null;
    }
}
