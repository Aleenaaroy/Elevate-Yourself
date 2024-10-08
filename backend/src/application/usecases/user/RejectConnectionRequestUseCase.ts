import { UserRepository } from '../../../domain/repositories/UserRepository';

export class RejectConnectionRequestUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(userId: string, requestId: string) {
        // const requestRejected = await this.userRepository.rejectConnectionRequest(userId, requestId); //needs code imple
        // if (!requestRejected) {
        //     return { error: 'Failed to reject connection request' };
        // }

        return { message: 'Connection request removed' };
    }
}
