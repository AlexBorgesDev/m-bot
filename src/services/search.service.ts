import yts from 'yt-search'

async function find(value: string) {
  const results = await yts(value)
  return results.videos.slice(0, 5)
}

async function findOne(value: string) {
  const results = await yts.search(value)
  return results.videos[0]
}

export default { find, findOne }
