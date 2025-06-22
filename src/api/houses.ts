import { logger } from '@/utils/logger'
import axios from 'axios'

export async function fetchHouses() {
  const res = await axios.get('https://wizard-world-api.herokuapp.com/Houses')
  logger.info('Fetched houses:', res.data)
  return res.data
}
export async function fetchHouseById(id: string) {
  const res = await axios.get(`https://wizard-world-api.herokuapp.com/Houses/${id}`)
  logger.info(`Fetched house with ID ${id}:`, res.data)
  return res.data
}
export async function fetchHousePeople(id: string) {
  const res = await axios.get(`https://hp-api.onrender.com/api/characters/house/${id}`)
  logger.info(`Fetched house characters with ID ${id}:`, res.data)
  return res.data
}
