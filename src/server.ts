import Fastify from 'fastify'
import { userRoutes } from './users/users.routes'
import fjwt from '@fastify/jwt'
import { usersSchema } from './users/user.schema'
import { linkCollectionSchemas } from './link-collections/link-collections.schema'
import { linkCollectionRoutes } from './link-collections/link-collections.routes'
import 'dotenv/config'
import { tagsRoutes } from './tags/tags.routes'
import { tagsSchema } from './tags/tags.schema'

export const fastify = Fastify({ logger: true })
declare module 'fastify' {

  export interface FastifyInstance {
    authenticate: any
  }
  interface FastifyRequest {
    jwtPayload: any
  }
}
void fastify.register(fjwt, {
  secret: process.env.TOKEN_KEY ?? ''
})

for (const schema of [...usersSchema, ...linkCollectionSchemas, ...tagsSchema]) {
  fastify.addSchema(schema)
}
void fastify.register(userRoutes, { prefix: '/users' })
void fastify.register(linkCollectionRoutes, { prefix: '/link-collections' })
void fastify.register(tagsRoutes, { prefix: '/tags' })

fastify.setErrorHandler(function (error, _, reply) {
  void reply
    .status(error.statusCode ?? 500)
    .send({
      message: error.message
    })
})

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
void start()
