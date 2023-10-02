import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const createLinkCollectionObj = {
  name: z.string(),
  links: z.array(z.string()).optional(),
  tagIds: z.array(z.number()).optional(),
  isPrivate: z.boolean().optional()
}

const createLinkCollection = z.object({
  ...createLinkCollectionObj
})
  .refine(input => {
    if (input.links?.length !== 0 && input.tagIds?.length === 0) return false
    return true
  })

const createLinkCollectionResponse = z.object({ ...createLinkCollectionObj })

export type TCreateLinkCollectionInput = z.infer<typeof createLinkCollection>

export const { schemas: linkCollectionSchemas, $ref } = buildJsonSchemas({ createLinkCollection, createLinkCollectionResponse }, { $id: 'linkCollectionsSchema' })
