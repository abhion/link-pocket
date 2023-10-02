import { type FastifyReply, type FastifyRequest } from 'fastify'
import { type TLoginInput, type TCreateUserInput } from './user.schema'
import { createUser, verifyLogin } from './user.service'

export const createUserHandler = async (request: FastifyRequest<{ Body: TCreateUserInput }>, reply: FastifyReply) => {
  const createdUser = await createUser(request.body)
  return await reply.code(201).send(createdUser)
}

export const loginHandler = async (request: FastifyRequest<{ Body: TLoginInput }>, reply: FastifyReply) => {
  const { token, user } = await verifyLogin(request.body)
  return await reply.code(200).send({ ...user, accessToken: token })
}
