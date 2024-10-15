// backend\src\domain\repositories\interfaces\IPostRepository.ts
import { Post } from '../../entities/Post'; 
import { PostDocument } from '../../../infrastructure/models/PostModel';

export interface IPostRepository {
    create(post: Post): Promise<PostDocument>;
    findById(postId: string): Promise<PostDocument | null>;
    findAll(): Promise<PostDocument[]>;
    update(postId: string, post: Partial<Post>): Promise<PostDocument | null>;
    delete(postId: string): Promise<boolean>;
    likePost(postId: string, userId: string): Promise<PostDocument | null>;
    unlikePost(postId: string, userId: string): Promise<PostDocument | null>;
    reportPost(postId: string, report: { user: string; reason: string }): Promise<PostDocument | null>;
    findByIdAndRemove(postId: string): Promise<PostDocument | null>;
    countPosts(): Promise<number>;
}
