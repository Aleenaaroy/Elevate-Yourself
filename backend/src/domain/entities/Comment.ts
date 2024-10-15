// backend\src\domain\entities\Comment.ts

export interface Comment {
    id?: string; 
    userId?: string; 
    companyId?: string; 
    postId: string; 
    text: string;
    createdAt?: Date; 
    updatedAt?: Date;
}
