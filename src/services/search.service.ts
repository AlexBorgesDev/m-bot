import yts from 'yt-search'

async function find(value: string) {
  const results = await yts(value)
  return results.videos.slice(0, 5)
}

async function findOne(value: string) {
  const results = await yts(value)
  return results.videos[0]
}

async function findPlaylist(listId: string) {
  try {
    const { title, author, videos } = await yts({ listId })
    return { title, author, videos }
  } catch (err) {
    return undefined
  }
}

async function findById(videoId: string) {
  const result = await yts({ videoId })
  return result
}

export default { find, findOne, findPlaylist, findById }
