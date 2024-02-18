import { BALANCES } from '../utils/loicoin'

export default defineEventHandler(async (e) => {
  let params = getQuery(e)
  if (!BALANCES[params['user']]) {
    BALANCES[params['user']] = 0.0
  }
  return {
    user: params['user'],
    balance: BALANCES[params['user']],
  }
})
