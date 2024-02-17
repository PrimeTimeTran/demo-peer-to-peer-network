import { BALANCES } from '../utils/loicoin'

export default defineEventHandler(async (e) => {
  let params = getQuery(e)
  return {
    user: params['user'],
    balance: BALANCES[params['user']],
  }
})
