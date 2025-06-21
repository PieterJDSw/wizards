import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchHouses, fetchHouseById } from './houses'

vi.mock('axios')

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchHouses', () => {
  it('fetches houses from the API', async () => {
    const fakeData = [{ id: '1', name: 'Test House' }]
    mockedAxios.get = vi.fn().mockResolvedValue({ data: fakeData })

    const result = await fetchHouses()

    expect(mockedAxios.get).toHaveBeenCalledWith('https://wizard-world-api.herokuapp.com/Houses')
    expect(result).toEqual(fakeData)
  })
})

describe('fetchHouseById', () => {
  it('fetches a house by id from the API', async () => {
    const fakeData = { id: '1', name: 'Test House' }
    mockedAxios.get = vi.fn().mockResolvedValue({ data: fakeData })

    const result = await fetchHouseById('1')

    expect(mockedAxios.get).toHaveBeenCalledWith('https://wizard-world-api.herokuapp.com/Houses/1')
    expect(result).toEqual(fakeData)
  })
})
