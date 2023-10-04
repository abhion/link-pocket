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

const getPublicLinkCollections = z.array(z.object({
  id: z.number(),
  name: z.string(),
  viewsCount: z.number(),
  likesCount: z.number(),
  links: z.array(z.object({
    id: z.number(),
    linkUrl: z.string()
  })),
  tags: z.array(z.object({ id: z.number(), name: z.string() })),
  user: z.object({
    id: z.number(),
    name: z.string(),
    profilePicture: z.string().optional()
  })
}))

const createLinkCollectionResponse = z.object({ ...createLinkCollectionObj })

const connectCollectionToUserSchema = z.object({
  linkCollectionId: z.number()
})

const addLinkToLinkCollectionSchema = z.object({
  linkCollectionId: z.number(),
  linkUrls: z.array(z.string()),
  tagIds: z.array(z.number())
})

export type TCreateLinkCollectionInput = z.infer<typeof createLinkCollection>

export type TConnectCollectionToUserInput = z.infer<typeof connectCollectionToUserSchema>
export type TAddLinkToLinkCollectionInput = z.infer<typeof addLinkToLinkCollectionSchema>

export const { schemas: linkCollectionSchemas, $ref } =
  buildJsonSchemas({
    createLinkCollection,
    createLinkCollectionResponse,
    getPublicLinkCollections,
    connectCollectionToUserSchema,
    addLinkToLinkCollectionSchema
  }, { $id: 'linkCollectionsSchema' })
