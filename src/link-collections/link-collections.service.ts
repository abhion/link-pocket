import prisma from '../utils/prisma-client'
import { type TCreateLinkCollectionInput } from './link-collections.schema'

export const createLinkCollection = async (requestData: TCreateLinkCollectionInput, jwtPayload: any) => {
  try {
    const createdCollection = await prisma.linkCollection.create({
      data: {
        name: requestData.name,
        isPrivate: requestData.isPrivate,
        userId: jwtPayload.id,
        links: { createMany: { data: requestData.links?.map(link => ({ linkUrl: link })) ?? [] } },
        tags: { connect: requestData.tagIds?.map(tagId => ({ id: tagId })) }
      }
    })
    return createdCollection
  } catch (error) {
    return await Promise.reject(error)
  }
}
