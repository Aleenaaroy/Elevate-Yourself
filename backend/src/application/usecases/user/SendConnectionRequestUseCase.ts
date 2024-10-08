import { UserRepository } from '../../../domain/repositories/UserRepository';

export class SendConnectionRequestUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(userId: string, targetUserId: string) {
        const user = await this.userRepository.findUserById(targetUserId);
        if (!user) {
            return { error: 'Target user not found' };
        }

        // const requestSent = await this.userRepository.SendConnectionRequest(userId, targetUserId);//needs imple
        // if (!requestSent) {
        //     return { error: 'Failed to send connection request' };
        // }

        return { message: 'Connection request sent' };
    }
}
