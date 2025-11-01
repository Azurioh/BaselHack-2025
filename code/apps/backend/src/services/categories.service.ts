import { Category } from '@baselhack/shared/types/categories.types';
import type { CategoriesRepository } from '@repositories/categories.repository';
import { type Filter, ObjectId } from 'mongodb';

export class CategoriesService {
  private categoriesRepository: CategoriesRepository;

  constructor(categoriesRepository: CategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async createCategory(category: Category) {
    const data: Category = {
      ...category,
    };
    const newCategory = await this.categoriesRepository.createCategory(data);

    return newCategory;
  }

  async listAllCategories(filter?: Filter<Category>) {
    const categories = await this.categoriesRepository.listAllCategories(filter);

    return categories;
  }

  async updateCategory(id: string, category: Category) {
    const updatedCategory = await this.categoriesRepository.updateCategory(id, category);

    return updatedCategory;
  }

  async deleteCategory(id: string) {
    const deletedCategory = await this.categoriesRepository.deleteCategory(id);

    return deletedCategory;
  }
}
