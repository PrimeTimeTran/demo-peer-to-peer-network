import { BALANCES } from '../utils/loicoin'

export default defineEventHandler(async (e) => {
  let params = getQuery(e)
  const user = BALANCES[params['user']]
  if (!user) {
    user = 0.0
  }
  return {
    user: params['user'],
    balance: user,
  }
})
