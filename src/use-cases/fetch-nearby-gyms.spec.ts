import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGyms } from './fetch-nearby-gyms'

let GymsRepository: InMemoryGymsRepository
let sut: FetchNearByGyms

describe('Fetch nearby gyms Use Case', () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGyms(GymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await GymsRepository.create({
      title: 'perto Gym',
      description: null,
      phone: null,
      latitude: -23.613001480085956,
      longitude: -46.57950729137682,
    })

    await GymsRepository.create({
      title: 'longe Gym',
      description: null,
      phone: null,
      latitude: -23.664163913749597,
      longitude: -46.459544377698165,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.613001480085956,
      userLongitude: -46.57950729137682,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'perto Gym' })])
  })
})
