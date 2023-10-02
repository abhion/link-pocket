import { type FastifyInstance } from 'fastify'
import { createLinkCollectionHandler } from './link-collections.controller'
import { $ref } from './link-collections.schema'
import { authenticate } from '../utils/utils'

export async function linkCollectionRoutes (fastify: FastifyInstance) {
  fastify.post('/create', {
    schema: { body: $ref('createLinkCollection'), response: { 201: $ref('createLinkCollectionResponse') } },
    preHandler: [authenticate]

  }, createLinkCollectionHandler)
}
