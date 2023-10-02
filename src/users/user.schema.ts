import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const commonCreateUserFields = {
  name: z.string(),
  email: z.string().email()
}

const createUserSchema = z.object({
  ...commonCreateUserFields,
  password: z.string()
})

const createUserResponseSchema = z.object({
  ...commonCreateUserFields
})

const loginSchema = z.object({
  email: z.string(),
  password: z.string()
})

const loginResponseSchema = z.object({
  ...commonCreateUserFields,
  profilePicture: z.string().optional(),
  accessToken: z.string()
})

export type TCreateUserInput = z.infer<typeof createUserSchema>

export type TLoginInput = z.infer<typeof loginSchema>

export const { schemas: usersSchema, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema
}, { $id: 'usersSchema' })
