import { UserRepository } from '../../../domain/repositories/UserRepository';
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository';

export class FollowAndUnfollowCompanyUseCase {
    private userRepository: UserRepository;
    private companyRepository: CompanyRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.companyRepository = new CompanyRepository();
    }

    async execute(userId: string, companyId: string) {
        const company = await this.companyRepository.findById(companyId);
        if (!company) {
            return { error: 'Company not found' };
        }

        //const followOrUnfollow = await this.userRepository.toggleFollowCompany(userId, companyId);// needs code imple
       // return { message: followOrUnfollow ? 'Followed company' : 'Unfollowed company' };
        return {message: 'Unfollowed company' };
    }
}
