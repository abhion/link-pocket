import { type FastifyReply, type FastifyRequest } from 'fastify'
import { createLinkCollection } from './link-collections.service'
import { type TCreateLinkCollectionInput } from './link-collections.schema'

export const createLinkCollectionHandler = async (request: FastifyRequest<{ Body: TCreateLinkCollectionInput }>, reply: FastifyReply) => {
  const jwtPayload = request.jwtPayload
  const createdLinkCollection = await createLinkCollection(request.body, jwtPayload)

  return await reply.code(201).send(createdLinkCollection)
}
