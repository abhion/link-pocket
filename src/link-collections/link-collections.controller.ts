import { type FastifyReply, type FastifyRequest } from 'fastify'
import { addLinkToLinkCollection, connectCollectionToUser, createLinkCollection, getLinkCollectionsOfUser, getPublicLinkCollections } from './link-collections.service'
import { type TAddLinkToLinkCollectionInput, type TConnectCollectionToUserInput, type TCreateLinkCollectionInput } from './link-collections.schema'

export const createLinkCollectionHandler = async (request: FastifyRequest<{ Body: TCreateLinkCollectionInput }>, reply: FastifyReply) => {
  const jwtPayload = request.jwtPayload
  const createdLinkCollection = await createLinkCollection(request.body, jwtPayload)

  return await reply.code(201).send(createdLinkCollection)
}

export const getPublicLinkCollectionsHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  const publicLinkCollections = await getPublicLinkCollections()

  return await reply.code(200).send(publicLinkCollections)
}

export const getLinkCollectionsOfUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const linkCollectionOfUser = await getLinkCollectionsOfUser(request.jwtPayload.id)
  return await reply.code(200).send(linkCollectionOfUser)
}

export const connectCollectionToUserHandler = async (request: FastifyRequest<{ Body: TConnectCollectionToUserInput }>, reply: FastifyReply) => {
  const updatedLinkCollection = await connectCollectionToUser(request.jwtPayload.id, request.body.linkCollectionId)
  return await reply.code(200).send(updatedLinkCollection)
}

export const addLinkToLinkCollectionHandler = async (request: FastifyRequest<{ Body: TAddLinkToLinkCollectionInput }>, reply: FastifyReply) => {
  const updatedLinkCollection = await addLinkToLinkCollection(request.body)
  return await reply.code(200).send(updatedLinkCollection)
}
