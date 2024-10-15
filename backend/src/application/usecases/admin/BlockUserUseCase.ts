// backend\src\application\usecases\admin\BlockUserUseCase.ts
import { IUserRepository } from '../../../domain/repositories/interfaces/IUserRepository';

export class BlockUserUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string): Promise<string | null> {
        const user = await this.userRepository.updateUser(userId, { isBlocked: true });
        return user ? `Blocked ${user.name}` : null;
    }
}
