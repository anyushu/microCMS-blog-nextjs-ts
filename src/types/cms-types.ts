export interface GetsType<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

type DateType = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}

type Structure<T, P> = T extends 'get'
  ? { id: string } & DateType & Required<P>
  : T extends 'gets'
  ? GetsType<{ id: string } & DateType & Required<P>>
  : Partial<DateType> & (T extends 'patch' ? Partial<P> : P)

export type blog<T = 'get'> = Structure<
  T,
  {
    /**
     * タイトル
     */
    title: string
    /**
     * スラッグ
     */
    slug: string
    /**
     * アイキャッチ
     */
    thumbnail?: string
    /**
     * カテゴリー
     */
    category: ['others']
    /**
     * 投稿内容
     */
    content: string
  }
>

export interface EndPoints {
  get: {
    blog: blog<'get'>
  }
  gets: {
    blog: blog<'gets'>
  }
  post: {
    blog: blog<'post'>
  }
  put: {
    blog: blog<'put'>
  }
  patch: {
    blog: blog<'patch'>
  }
}
