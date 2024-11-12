import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AutheticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const autheticateUseCase = new AutheticateUseCase(usersRepository)

  return autheticateUseCase
}
