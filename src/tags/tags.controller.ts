import { type FastifyReply, type FastifyRequest } from 'fastify'
import { createTags } from './tags.service'
import { type TCreateTagsInput } from './tags.schema'

export const createTagsController = async (request: FastifyRequest<{ Body: TCreateTagsInput }>, reply: FastifyReply) => {
  const tags = await createTags(request.body)
  return await reply.code(201).send(tags)
}
