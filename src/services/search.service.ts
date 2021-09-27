import * as yts from 'youtube-search-without-api-key'

export type YTSearchResult = {
  id: {
    videoId: any
  }
  url: string
  title: string
  description: string
  duration_raw: string
  snippet: {
    url: string
    duration: string
    publishedAt: any
    thumbnails: {
      id: any
      url: any
      default: any
      high: any
      height: any
      width: any
    }
    title: string
    views: any
  }
  views: any
}

async function find(value: string): Promise<YTSearchResult[]> {
  const results = await yts.search(value)
  return results.filter((_, index) => index <= 4)
}

async function findOne(value: string): Promise<YTSearchResult> {
  const results = await yts.search(value)
  return results[0]
}

export default { find, findOne }
