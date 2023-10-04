import { type FastifyInstance } from 'fastify'
import { addLinkToLinkCollectionHandler, connectCollectionToUserHandler, createLinkCollectionHandler, getLinkCollectionsOfUserHandler, getPublicLinkCollectionsHandler } from './link-collections.controller'
import { $ref } from './link-collections.schema'
import { authenticate } from '../utils/utils'

export async function linkCollectionRoutes (fastify: FastifyInstance) {
  fastify.post('/create', {
    schema: { body: $ref('createLinkCollection'), response: { 201: $ref('createLinkCollectionResponse') } },
    preHandler: [authenticate]

  }, createLinkCollectionHandler)

  fastify.get('/public', { schema: { response: { 200: $ref('getPublicLinkCollections') } } }, getPublicLinkCollectionsHandler)

  fastify.get('/user', { preHandler: [authenticate] }, getLinkCollectionsOfUserHandler)

  fastify.post('/connect-user', { schema: { body: $ref('connectCollectionToUserSchema') }, preHandler: [authenticate] }, connectCollectionToUserHandler)

  fastify.post('/add-link', { schema: { body: $ref('addLinkToLinkCollectionSchema') }, preHandler: [authenticate] }, addLinkToLinkCollectionHandler)
}
