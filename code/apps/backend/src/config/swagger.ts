import { environment } from '@config/environment';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import type { FastifyInstance } from 'fastify';

export const setupSwagger = (app: FastifyInstance): void => {
  const baseUrl = environment.API_BASE_URL.replace(/^http:/, 'https:');

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API',
        description: 'documentation API',
        version: '0.1.0',
      },
      servers: [{ url: baseUrl }],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    staticCSP: true,
    transformSpecification: (swaggerObject: Record<string, unknown>) => {
      if (swaggerObject.servers && Array.isArray(swaggerObject.servers) && swaggerObject.servers[0]) {
        const server = swaggerObject.servers[0] as { url?: string };
        if (server.url) {
          server.url = server.url.replace(/^http:/, 'https:');
        }
      }
      return swaggerObject;
    },
  });
};
