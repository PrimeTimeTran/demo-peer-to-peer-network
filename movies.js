import fs from 'fs'
import chalk from 'chalk'
import readline from 'readline'

export async function readLinesFromFile(filePath) {
  const lines = []
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  for await (const line of rl) {
    lines.push(line)
  }

  return lines
}

function sampleLines(lines, sampleSize) {
  const sampledLines = []
  const lineCount = lines.length
  sampleSize = Math.min(sampleSize, lineCount)
  const sampledIndices = new Set()
  while (sampledIndices.size < sampleSize) {
    const randomIndex = Math.floor(Math.random() * lineCount)
    if (!sampledIndices.has(randomIndex)) {
      sampledIndices.add(randomIndex)
      sampledLines.push(lines[randomIndex])
    }
  }

  return sampledLines[0]
}

export async function setNewMovie(port) {
  const lines = await readLinesFromFile('./movies.txt')
  const sampledLines = sampleLines(lines, 1)
  port = sampledLines
  return sampledLines
}
