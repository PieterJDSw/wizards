import { logger } from '@/utils/logger'
import axios from 'axios'

export async function fetchElixirs() {
  const res = await axios.get('https://wizard-world-api.herokuapp.com/Elixirs')
  logger.info('Fetched elixirs:', res.data)
  return res.data
}
export async function fetchElixirById(id: string) {
  const res = await axios.get(`https://wizard-world-api.herokuapp.com/Elixirs/${id}`)
  logger.info(`Fetched elixir with ID ${id}:`, res.data)
  return res.data
}
