import { logger } from '@/utils/logger'
import axios from 'axios'

export async function fetchSpells() {
  const res = await axios.get('https://wizard-world-api.herokuapp.com/Spells')
  logger.info('Fetched spells:', res.data)
  return res.data
}
export async function fetchSpellById(id: string) {
  const res = await axios.get(`https://wizard-world-api.herokuapp.com/Spells/${id}`)
  logger.info(`Fetched spell with ID ${id}:`, res.data)
  return res.data
}
