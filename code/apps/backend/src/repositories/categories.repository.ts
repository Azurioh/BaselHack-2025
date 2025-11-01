import { Category } from '@baselhack/shared/types/categories.types';
import type { Answer, Question } from '@baselhack/shared/types/questions.types';
import { MongoCollections } from '@enums/mongo-collections-enums';
import { type Db, type Filter, ObjectId } from 'mongodb';

export class CategoriesRepository {
  private db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async createCategory(category: Category) {
    const newCategory = await this.db.collection<Category>(MongoCollections.CATEGORIES).insertOne({ ...category });

    return newCategory;
  }

  async listAllCategories(filter?: Filter<Category>) {
    const categories = await this.db
      .collection<Category>(MongoCollections.CATEGORIES)
      .find(filter || {})
      .toArray();

    return categories;
  }

  async updateCategory(id: string, category: Category) {
    const updatedCategory = await this.db
      .collection<Category>(MongoCollections.CATEGORIES)
      .updateOne({ _id: new ObjectId(id) }, { $set: category });

    return updatedCategory;
  }

  async deleteCategory(id: string) {
    const deletedCategory = await this.db
      .collection<Category>(MongoCollections.CATEGORIES)
      .deleteOne({ _id: new ObjectId(id) });

    return deletedCategory;
  }
}
