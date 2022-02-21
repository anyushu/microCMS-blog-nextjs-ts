import type { MicroCMSQueries } from 'microcms-js-sdk'
import { microcmsClient } from '@/libs/microcms/api-client'
import type { blog } from '@/types/cms-types'

export const END_POINT = 'blog'

/**
 * slug取得
 *
 * @returns blog
 */
export const getAllSlugs = () => {
  return microcmsClient.getList<blog>({
    endpoint: END_POINT,
    queries: {
      limit: 99999,
    },
  })
}

/**
 * ブログ一覧の取得
 *
 * @param {number} limit 取得投稿数
 * @param {number} offset ページ番号
 * @param {string} keyword 全文検索キーワード
 * @returns blog
 */
export const getBlogList = (limit?: number, offset?: number, keyword?: string) => {
  const queries: MicroCMSQueries = {
    limit: limit,
    offset: offset,
    q: keyword,
    orders: '-publishedAt',
  }

  return microcmsClient.getList<blog>({
    endpoint: END_POINT,
    queries: queries,
  })
}

/**
 * ブログ詳細の取得
 */
export const getBlog = (slug: string, draftKey?: string) => {
  return microcmsClient.get<blog>({
    endpoint: END_POINT,
    contentId: slug,
    queries: {
      draftKey: draftKey,
    },
  })
}
