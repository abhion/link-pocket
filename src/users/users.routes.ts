import { type FastifyInstance } from 'fastify'
import { $ref } from './user.schema'
import { createUserHandler, loginHandler } from './user.controller'

export async function userRoutes (fastify: FastifyInstance): Promise<void> {
  fastify.post('/signup', {
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: $ref('createUserResponseSchema')
      }
    }
  }, createUserHandler)

  fastify.post('/login', {
    schema: {
      body: $ref('loginSchema'),
      response:
    { 200: $ref('loginResponseSchema') }
    }
  },
  loginHandler)
}
