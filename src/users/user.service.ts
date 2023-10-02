import { Prisma } from '@prisma/client'
import { fastify } from '../server'
import prisma from '../utils/prisma-client'
import { type TLoginInput, type TCreateUserInput } from './user.schema'
import bcrypt from 'bcrypt'
import { ResponseError } from '../utils/utils'

export const createUser = async (user: TCreateUserInput) => {
  try {
    const { salt, hashedPassword } = getHashedPasswordAndSalt(user.password)
    const createdUser = await prisma.user.create({ data: { ...user, salt, password: hashedPassword } })
    return createdUser
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const e = new ResponseError('User with this email already exists', 400)
      return await Promise.reject(e)
    }
    return await Promise.reject(error)
  }
}

const getHashedPasswordAndSalt = (password: string) => {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  return {
    salt,
    hashedPassword
  }
}

export const verifyLogin = async (loginInput: TLoginInput) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: loginInput.email } })
    if (user === null) {
      throw new Error('Invalid username or password')
    }
    const isPasswordCorrect = bcrypt.compareSync(loginInput.password, user.password)
    if (!isPasswordCorrect) throw new Error('Invalid username or password')

    const token = fastify.jwt.sign({ id: user.id, email: user.email, name: user.name })
    return { user, token }
  } catch (error) {
    return await Promise.reject(error)
  }
}
