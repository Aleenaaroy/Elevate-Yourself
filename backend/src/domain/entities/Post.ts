// backend\src\domain\entities\Post.ts

export interface Post {
    id?: string; 
    user?: string; 
    company?: string; 
    description: string;
    media?: string[]; 
    createdAt?: Date; 
    likes?: string[]; 
    comments?: string[]; 
    isDeleted?: boolean; 
    reports?: Report[]; 
    updatedAt?: Date; 
}

export interface Report {
    user: string; 
    reason?: string; 
}
