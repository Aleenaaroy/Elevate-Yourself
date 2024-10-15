// backend\src\domain\repositories\PostRepository.ts
import { IPostRepository } from './interfaces/IPostRepository';
import PostModel, { PostDocument } from '../../infrastructure/models/PostModel';
import { Post } from '../../domain/entities/Post'; 

export class PostRepository implements IPostRepository {
    async create(post: Post): Promise<PostDocument> {
        const newPost = new PostModel(post);
        await newPost.save();
        return newPost.toObject();
    }

    async findById(postId: string): Promise<PostDocument | null> {
        const post = await PostModel.findById(postId)
            .populate('user')
            .populate('company');
        return post ? post.toObject() : null;
    }

    async findAll(): Promise<PostDocument[]> {
        const posts = await PostModel.find()
            .populate('user')
            .populate('company')
            .sort({ createdAt: -1 });
        return posts.map(post => post.toObject());
    }

    async update(postId: string, post: Partial<Post>): Promise<PostDocument | null> {
        const updatedPost = await PostModel.findByIdAndUpdate(postId, post, { new: true })
            .populate('user')
            .populate('company');
        return updatedPost ? updatedPost.toObject() : null;
    }

    async delete(postId: string): Promise<boolean> {
        const result = await PostModel.findByIdAndDelete(postId);
        return result !== null;
    }

    async findByIdAndRemove(postId: string): Promise<PostDocument | null> {
        const removedPost = await PostModel.findByIdAndDelete(postId); // Use findByIdAndDelete instead
        return removedPost ? removedPost.toObject() : null;
    }

    async likePost(postId: string, userId: string): Promise<PostDocument | null> {
        return PostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        ).exec();
    }

    async unlikePost(postId: string, userId: string): Promise<PostDocument | null> {
        return PostModel.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        ).exec();
    }

    async reportPost(postId: string, report: { user: string; reason: string }): Promise<PostDocument | null> {
        return PostModel.findByIdAndUpdate(
            postId,
            { $push: { reports: report } },
            { new: true }
        ).exec();
    }

    async countPosts(): Promise<number> {
        const postCount = await PostModel.countDocuments();
        return postCount;
    }
}
