import mutexify from 'mutexify'
import chalk from 'chalk'

class ThreadSafeHashMap {
  constructor() {
    this.map = new Map()
    this.mutex = mutexify()
  }

  get peersCount() {
    return this.map.size
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      this.mutex(async (release) => {
        this.map.set(key, value)
        release()
        resolve()
      })
    })
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.mutex(async (release) => {
        const value = this.map.get(key)
        release()
        resolve(value)
      })
    })
  }

  async remove(key) {
    return new Promise((resolve, reject) => {
      this.mutex(async (release) => {
        this.map.delete(key)
        release()
        resolve()
      })
    })
  }

  async updateState(key, value) {
    return new Promise((resolve, reject) => {
      this.mutex(async (release) => {
        this.map.set(key, value)
        release()
        resolve()
      })
    })
  }
  printKeysAndValues(port) {
    console.log('------------------------')
    for (let [key, value] of this.map.entries()) {
      const [version, movie] = value.split(':')
      if (port.toString() === key) continue
      console.log(
        `Peer: ${chalk.green(key)}: Version: ${chalk.green(
          version
        )}: Movie: ${chalk.blue(movie)}`
      )
    }
    console.log('------------------------')
  }
}
const threadSafeMap = new ThreadSafeHashMap()

export default threadSafeMap
