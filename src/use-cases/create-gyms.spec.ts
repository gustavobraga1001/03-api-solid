import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsMemoryRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym Use Case', () => {
  beforeEach(() => {
    gymsMemoryRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsMemoryRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Js Gym',
      description: null,
      phone: null,
      latitude: -23.613001480085956,
      longitude: -46.57950729137682,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
