import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createTagsSchema = z.object({ tags: z.array(z.string()) })

const createTagsResponseSchema = z.object({ tagsCount: z.number() })

export type TCreateTagsInput = z.infer<typeof createTagsSchema>

export const { schemas: tagsSchema, $ref } = buildJsonSchemas({ createTagsSchema, createTagsResponseSchema }, { $id: 'tagsSchema' })
