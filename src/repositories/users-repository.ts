import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findById(idUser: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
