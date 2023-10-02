import { type FastifyRequest, type FastifyReply } from 'fastify'

export class ResponseError extends Error {
  statusCode = 200
  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const authenticate = async function (request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
  const jwtPayload = await request.jwtVerify()
  request.jwtPayload = jwtPayload
}
