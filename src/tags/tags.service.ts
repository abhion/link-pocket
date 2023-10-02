import prisma from '../utils/prisma-client'
import { type TCreateTagsInput } from './tags.schema'

export const createTags = async (createTagsInput: TCreateTagsInput) => {
  try {
    const tagsCount = await prisma.tag.createMany({ data: createTagsInput.tags.map(tag => ({ name: tag })), skipDuplicates: true })
    return tagsCount
  } catch (error) {
    return await Promise.reject(error)
  }
}
