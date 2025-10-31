import type { FastifyInstance } from 'fastify';
import healthRoute from './health';
import authRoute from './auth.routes';

export async function router(app: FastifyInstance): Promise<void> {
  app.register(healthRoute, { prefix: '/health' });
  app.register(authRoute, { prefix: '/auth' });
}
