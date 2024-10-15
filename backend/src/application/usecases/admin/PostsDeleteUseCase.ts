import { IPostRepository } from '../../../domain/repositories/interfaces/IPostRepository';

export class PostDeleteUseCase {
    constructor(private postRepo: IPostRepository) {}

    async execute(postId: string): Promise<string> {
        const post = await this.postRepo.findByIdAndRemove(postId);

        if (!post) throw new Error('Post not found');
        
        return 'Deleted Successfully';
    }
}
