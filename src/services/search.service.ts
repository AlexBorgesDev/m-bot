import yts from 'yt-search'

async function find(value: string) {
  const results = await yts(value)
  return results.videos.slice(0, 5)
}

async function findOne(value: string) {
  const results = await yts.search(value)
  return results.videos[0]
}

async function findPlaylist(listId: string) {
  const { title, author, videos } = await yts.search({ listId })
  return { title, author, videos }
}

export default { find, findOne, findPlaylist }
