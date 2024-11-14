import { Gym, Prisma } from '@prisma/client'

export interface findManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(idUser: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  finfManyNearby(params: findManyNearbyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
