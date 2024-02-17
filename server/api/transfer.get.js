import { BALANCES } from '../utils/loicoin'

export default defineEventHandler(async (e) => {
  let { to, from, amount } = getQuery(e)
  if (!(BALANCES[from] >= 0)) {
    throw new Error(from + ' has insufficient funds')
  }

  BALANCES[to] += parseFloat(amount)
  BALANCES[from] -= amount
  return BALANCES
})
