import { CategoriesController } from '@controllers/categories.controllers';
import { CategoriesService } from '@services/categories.service';
import { CategoriesRepository } from '@repositories/categories.repository';
import { authMiddleware } from '@middlewares/auth-middleware';
import type { FastifyInstance } from 'fastify';

export default async (app: FastifyInstance) => {
  if (!app.mongo.db) {
    throw new Error('MongoDB database is not connected');
  }
  const categoriesRepository = new CategoriesRepository(app.mongo.db);
  const categoriesService = new CategoriesService(categoriesRepository);
  const categoriesController = new CategoriesController(categoriesService);

  app.route({
    method: 'POST',
    url: '/v1/',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => categoriesController.createCategory(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
  app.route({
    method: 'GET',
    url: '/v1/',
    handler: categoriesController.listAllCategories.bind(categoriesController),
  });
  app.route({
    method: 'PUT',
    url: '/v1/:category_id',
    handler: (request: any, reply) => categoriesController.updateCategory(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
  app.route({
    method: 'DELETE',
    url: '/v1/:category_id',
    // biome-ignore lint/suspicious/noExplicitAny: Middleware compatibility
    handler: (request: any, reply) => categoriesController.deleteCategory(request, reply),
    preHandler: [authMiddleware({ adminOnly: true })],
  });
};
