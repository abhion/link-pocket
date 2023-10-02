import { type FastifyInstance } from 'fastify'
import { createTagsController } from './tags.controller'

export async function tagsRoutes (fastify: FastifyInstance) {
  fastify.post('/create', createTagsController)
}
