import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchElixirs, fetchElixirById } from './elixirs'

vi.mock('axios')

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchElixirs', () => {
  it('fetches elixirs from the API', async () => {
    const fakeData = [{ id: '1', name: 'Test Elixir' }]
    mockedAxios.get = vi.fn().mockResolvedValue({ data: fakeData })

    const result = await fetchElixirs()

    expect(mockedAxios.get).toHaveBeenCalledWith('https://wizard-world-api.herokuapp.com/Elixirs')
    expect(result).toEqual(fakeData)
  })
})

describe('fetchElixirById', () => {
  it('fetches an elixir by id from the API', async () => {
    const fakeData = { id: '1', name: 'Test Elixir' }
    mockedAxios.get = vi.fn().mockResolvedValue({ data: fakeData })

    const result = await fetchElixirById('1')

    expect(mockedAxios.get).toHaveBeenCalledWith('https://wizard-world-api.herokuapp.com/Elixirs/1')
    expect(result).toEqual(fakeData)
  })
})
