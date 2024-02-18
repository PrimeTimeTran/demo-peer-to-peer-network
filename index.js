import net from 'net'
import chalk from 'chalk'

import threadSafeMap from './ThreadSafeHashMap.js'
import { setNewMovie } from './movies.js'

let port
if (process.argv.length > 2) {
  const arg1 = process.argv[2]
  port = parseInt(arg1)
} else {
  port = 3000
}

const peers = ['localhost:3000', 'localhost:3001']

let client
let VERSION = 0

function sendMessage(message) {
  const randomPeer = peers[Math.floor(Math.random() * peers.length)]
  const [host, port] = randomPeer.split(':')

  client = net.createConnection({ host, port }, () => {
    client.write(message)
  })

  client.on('data', (data) => {
    console.log('Connected to peer:', data)
    client.end()
  })

  client.on('end', () => {
    console.log('Disconnected from peer:', randomPeer)
  })

  client.on('error', (err) => {
    console.error('Error:', err)
    client.end()
  })
}

const server = net.createServer((socket) => {
  socket.on('data', async (data) => {
    const [peer, version, movie] = data.toString().split(':')
    if (version >= VERSION) {
      await threadSafeMap.set(peer, `${version}:${movie}`)
      threadSafeMap.printKeysAndValues(peer)
    }
  })

  socket.on('end', () => {
    console.log('Peer disconnected:', socket.remoteAddress, socket.remotePort)
  })

  socket.on('error', (err) => {
    console.error('Socket error:', err)
  })
})

server.listen(port, async () => {
  const movie = await setNewMovie()
  await threadSafeMap.set(port, `${VERSION}:${movie}`)
  setInterval(async () => {
    const value = await threadSafeMap.get(port)
    const message = `${port}:${value}`
    sendMessage(message)
  }, 3000)

  setInterval(async () => {
    VERSION += 1
    const movie = await setNewMovie()
    await threadSafeMap.set(port, `${VERSION}:${movie}`)
    console.log(
      `${chalk.greenBright(port)}: Changed Mind! Updated to ${chalk.magenta(
        movie
      )}`
    )
    const value = await threadSafeMap.get(port)
    const message = `${port}:${value}`
    sendMessage(message)
  }, 8000)
})
