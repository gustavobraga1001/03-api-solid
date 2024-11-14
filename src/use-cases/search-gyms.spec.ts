import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymUseCase } from './seach-gyms'

let GymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search gyms Use Case', () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(GymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await GymsRepository.create({
      title: 'Js Gym',
      description: null,
      phone: null,
      latitude: -23.613001480085956,
      longitude: -46.57950729137682,
    })

    await GymsRepository.create({
      title: 'Ts Gym',
      description: null,
      phone: null,
      latitude: -23.61347851551468,
      longitude: -46.578679841270116,
    })

    const { gyms } = await sut.execute({
      query: 'Js',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Js Gym' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await GymsRepository.create({
        title: `Smart fit unidade ${i}`,
        description: null,
        phone: null,
        latitude: -23.61347851551468,
        longitude: -46.578679841270116,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Smart fit',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Smart fit unidade 21' }),
      expect.objectContaining({ title: 'Smart fit unidade 22' }),
    ])
  })
})
