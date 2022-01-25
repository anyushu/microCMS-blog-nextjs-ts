import type { MicroCMSQueries } from 'microcms-js-sdk'
import { microcmsClient } from 'libs/microcms/api-client'
import type { GetsType, blog } from 'types/cms-types'

/**
 * ブログ一覧の取得
 *
 * @param {number} limit 取得投稿数
 * @param {number} offset ページ番号
 * @param {string} keyword 全文検索キーワード
 * @returns blog
 */
export const getBlogList = (
  limit?: number,
  offset?: number,
  keyword?: string,
): Promise<GetsType<blog>> => {
  const queries: MicroCMSQueries = {
    limit: limit,
    offset: offset,
    q: keyword,
    orders: '-publishedAt',
  }

  return microcmsClient.get<GetsType<blog>>({
    endpoint: 'blog',
    queries: queries,
  })
}

/**
 * ブログ取得
 *
 * @returns blog
 */
export const getBlog = () => {
  const queries: MicroCMSQueries = {}

  return microcmsClient.get<GetsType<blog>>({
    endpoint: 'blog',
    queries: queries,
  })
}
