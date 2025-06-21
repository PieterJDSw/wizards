import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchSpells, fetchSpellById } from './spells'

vi.mock('axios')

const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> }

beforeEach(() => {
  vi.clearAllMocks()
})

describe('fetchSpells', () => {
  it('fetches spells from the API', async () => {
    const fakeData = [{ id: '1', name: 'Test Spell' }]
    mockedAxios.get = vi.fn().mockResolvedValue({ data: fakeData })

    const result = await fetchSpells()

    expect(mockedAxios.get).toHaveBeenCalledWith('https://wizard-world-api.herokuapp.com/Spells')
    expect(result).toEqual(fakeData)
  })
})

describe('fetchSpellById', () => {
  it('fetches a spell by id from the API', async () => {
    const fakeData = { id: '1', name: 'Test Spell' }
    mockedAxios.get = vi.fn().mockResolvedValue({ data: fakeData })

    const result = await fetchSpellById('1')

    expect(mockedAxios.get).toHaveBeenCalledWith('https://wizard-world-api.herokuapp.com/Spells/1')
    expect(result).toEqual(fakeData)
  })
})
