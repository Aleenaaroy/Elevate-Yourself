import { ICategoryRepository } from '../../domain/repositories/interfaces/ICategoryRepository';
import { Category } from '../../domain/entities/Category';
import CategoryModel from '../../infrastructure/models/CategoryModel';

export class CategoryRepository implements ICategoryRepository {
    async create(category: Category): Promise<Category> {
        const newCategory = new CategoryModel(category);
        await newCategory.save();
        return newCategory.toObject();
    }

    async findById(id: string): Promise<Category | null> {
        const category = await CategoryModel.findById(id);
        return category ? category.toObject() : null;
    }

    async findAll(): Promise<Category[]> {
        const categories = await CategoryModel.find();
        return categories.map(category => category.toObject());
    }

    async update(id: string, category: Partial<Category>): Promise<Category | null> {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(id, category, { new: true });
        return updatedCategory ? updatedCategory.toObject() : null;
    }

    async delete(id: string): Promise<Category | null> {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        return deletedCategory ? deletedCategory.toObject() : null;
    }
    async findOne(query: any): Promise<Category | null> {  // Accepting any type of query
        const category = await CategoryModel.findOne(query);
        return category ? category.toObject() : null;
    }
    async find(): Promise<Category[]> {
        const industries = await CategoryModel.find();
        return industries.map(industry => industry.toObject());
    }
    async findByIdAndRemove(id: string): Promise<Category | null> {
        const removedCategory = await CategoryModel.findByIdAndDelete(id);
        return removedCategory ? removedCategory.toObject() : null;
    }
}
