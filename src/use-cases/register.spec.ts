import { expect, describe, it } from 'vitest'
import { RegitserUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegitserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegitserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed === true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegitserUseCase(usersRepository)

    const email = 'joeDown@example.com'

    await registerUseCase.execute({
      name: 'Jonw Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Jonw Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
