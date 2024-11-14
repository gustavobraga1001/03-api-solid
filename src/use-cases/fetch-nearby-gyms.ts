import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-respository'

interface FetchNearByGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearByGymsResponse {
  gyms: Gym[]
}

export class FetchNearByGyms {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearByGymsRequest): Promise<FetchNearByGymsResponse> {
    const gyms = await this.gymsRepository.finfManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
