import { Gym, Prisma } from '@prisma/client'

export interface GymsRepository {
  findById(idUser: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
