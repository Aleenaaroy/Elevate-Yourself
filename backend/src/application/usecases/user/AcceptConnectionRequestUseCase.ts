import { UserRepository } from '../../../domain/repositories/UserRepository';

export class AcceptConnectionRequestUseCase {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(userId: string, requestId: string) {
        // const requestAccepted = await this.userRepository.acceptConnectionRequest(userId, requestId); //needs imple
        // if (!requestAccepted) {
        //     return { error: 'Failed to accept connection request' };
        // }

        return { message: 'Request Accepted' };
    }
}
