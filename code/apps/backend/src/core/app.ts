import { Errors } from '@baselhack/shared/enums/errors';
import { HttpStatusCode } from '@baselhack/shared/enums/http-status';
import { setupCors } from '@config/cors';
import { setupDecorators } from '@config/decorators/setupDecorators';
import { environment } from '@config/environment';
import { setupMongoDB } from '@config/mongo';
import { setupRateLimit } from '@config/rate-limit';
import { setupSwagger } from '@config/swagger';
import { router as apiRoutes } from '@routes';
import ApiError from '@utils/api-error';
import fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from 'fastify';

/**
 * @function build
 *
 * @description This function builds the Fastify application.
 *
 * @returns {Promise<FastifyInstance>} A promise that resolves to a Fastify instance.
 */
async function build(): Promise<FastifyInstance> {
  const app: FastifyInstance = fastify({
    logger: true,
    bodyLimit: 10 * 1024 * 1024,
    ignoreTrailingSlash: true,
  });

  /*!> Setup decorators */
  setupDecorators(app);

  /*!> Setup Fastify plugins */
  setupCors(app);
  setupRateLimit(app);
  setupSwagger(app);
  setupMongoDB(app);

  /*!> Setup the routers */
  app.register(apiRoutes);

  /*!> Register the not found error handler */
  app.setNotFoundHandler((request: FastifyRequest, reply: FastifyReply) => {
    reply.error(`The resource ${request.url} doesn't exist`, HttpStatusCode.notFound, Errors.ROUTE_NOT_FOUND);
  });

  /*!> Register the default error handler */
  app.setErrorHandler((error: unknown, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ApiError) {
      reply.send({
        message: error.message,
        statusCode: error.statusCode,
        ...(error.data && { data: error.data }),
      });
    } else if (error instanceof Error) {
      if (environment.NODE_ENV === 'development') {
        reply.status(HttpStatusCode.internalServerError).send({
          message: error.message,
          statusCode: Errors.INTERNAL_SERVER_ERROR,
          stack: error.stack,
        });
      } else {
        reply.status(HttpStatusCode.internalServerError).send({
          message: error.message,
          statusCode: Errors.INTERNAL_SERVER_ERROR,
        });
      }
    } else {
      console.error('Unhandled error occured:', error);
      reply.status(HttpStatusCode.internalServerError).send({
        message: 'An unhandled error occurred while processing your request',
        statusCode: Errors.INTERNAL_SERVER_ERROR,
      });
    }
  });

  return app;
}

export default build;
