import type { FastifyInstance } from 'fastify';
import authRoute from './auth.routes';
import healthRoute from './health';
import questionsRoute from './questions.routes';

export async function router(app: FastifyInstance): Promise<void> {
  app.register(healthRoute, { prefix: '/health' });
  app.register(authRoute, { prefix: '/auth' });
  app.register(questionsRoute, { prefix: '/questions' });
}
