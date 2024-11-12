import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegitserUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegitserUseCase(usersRepository)

  return registerUseCase
}
