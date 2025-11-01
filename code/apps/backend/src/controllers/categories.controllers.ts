import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import type { Category } from '@baselhack/shared/types/categories.types';
import type { CategoriesService } from '@services/categories.service';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { type Filter, ObjectId } from 'mongodb';

export class CategoriesController {
  private categoriesService: CategoriesService;

  constructor(categoriesService: CategoriesService) {
    this.categoriesService = categoriesService;
  }

  async createCategory(
    request: FastifyRequest<{ Body: Category }>,
    reply: FastifyReply,
  ) {
    const category = await this.categoriesService.createCategory({
      ...request.body,
    });

    reply.success(category, HttpStatusCode.created);
  }

  async listAllCategories(request: FastifyRequest<{ Querystring: { filter?: Filter<Category> } }>, reply: FastifyReply) {
    const categories = await this.categoriesService.listAllCategories(request.query.filter);

    reply.success(categories, HttpStatusCode.ok);
  }

  async updateCategory(
    request: FastifyRequest<{
      Params: { category_id: string };
      Body: Category;
    }>,
    reply: FastifyReply,
  ) {
    const category = await this.categoriesService.updateCategory(request.params.category_id, {
      ...request.body,
    });

    reply.success(category, HttpStatusCode.ok);
  }

  async deleteCategory(request: FastifyRequest<{ Params: { category_id: string } }>, reply: FastifyReply) {
    const category = await this.categoriesService.deleteCategory(request.params.category_id);

    reply.success(category, HttpStatusCode.ok);
  }
}
