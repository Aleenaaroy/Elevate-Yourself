import { Category } from '../../entities/Category';

export interface ICategoryRepository {
    create(category: Category): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    update(id: string, category: Partial<Category>): Promise<Category | null>;
    delete(id: string): Promise<Category | null>;
    findOne(query: any): Promise<Category | null>;
    find(): Promise<Category[]>;
    findByIdAndRemove(id: string): Promise<Category | null>;  
}
