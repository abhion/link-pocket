import prisma from '../utils/prisma-client'
import { type TAddLinkToLinkCollectionInput, type TCreateLinkCollectionInput } from './link-collections.schema'

export const createLinkCollection = async (requestData: TCreateLinkCollectionInput, jwtPayload: any) => {
  try {
    const createdCollection = await prisma.linkCollection.create({
      data: {
        name: requestData.name,
        isPrivate: requestData.isPrivate,
        links: { createMany: { data: requestData.links?.map(link => ({ linkUrl: link })) ?? [] } },
        tags: { connect: requestData.tagIds?.map(tagId => ({ id: tagId })) },
        user: { connect: { id: jwtPayload.id } }
      }
    })
    return createdCollection
  } catch (error) {
    return await Promise.reject(error)
  }
}

export const getPublicLinkCollections = async () => {
  try {
    const publicLinkCollections = await prisma.linkCollection.findMany({
      where: { isPrivate: false },
      include: {
        links: true,
        tags: true,
        user: true
      }
    })

    return publicLinkCollections
  } catch (error) {
    return await Promise.reject(error)
  }
}

export const getLinkCollectionsOfUser = async (userId: number) => {
  try {
    const linkCollectionsOfUser = await prisma.linkCollection.findMany({
      where: { user: { some: { id: userId } } },
      include: {
        links: true,
        tags: true
      }
    })
    return linkCollectionsOfUser
  } catch (error) {
    return await Promise.reject(error)
  }
}

export const connectCollectionToUser = async (userId: number, linkCollectionId: number) => {
  try {
    const updatedLinkCollection = await prisma.linkCollection.update({
      where: { id: linkCollectionId },
      data: {
        user: { connect: { id: userId } }
      }
    })
    return updatedLinkCollection
  } catch (error) {
    return await Promise.reject(error)
  }
}

export const addLinkToLinkCollection = async (requestData: TAddLinkToLinkCollectionInput) => {
  try {
    const updatedLinkCollection = await prisma.linkCollection.update({
      where: { id: requestData.linkCollectionId },
      data: {
        links: { createMany: { data: requestData.linkUrls.map(url => ({ linkUrl: url })) } },
        tags: { connect: requestData.tagIds?.map(tagId => ({ id: tagId })) }
      },
      include: {
        tags: true,
        links: true
      }
    })
    return updatedLinkCollection
  } catch (error) {
    return await Promise.reject(error)
  }
}
