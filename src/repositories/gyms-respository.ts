import { Gym } from '@prisma/client'

export interface GymsRepository {
  findById(idUser: string): Promise<Gym | null>
}
