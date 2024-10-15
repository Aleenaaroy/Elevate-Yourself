import { IPostRepository } from '../../../domain/repositories/interfaces/IPostRepository';

export class GetAllPostsUseCase {
    constructor(private postRepo: IPostRepository) {}

    async execute(): Promise<any> {
        const posts = await this.postRepo.findAll(); 
        return posts.length > 0 ? posts : null;
    }
}
