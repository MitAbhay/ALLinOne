export interface Post {
  _id: string
  _createdAt: string
  title: string
  auther: {
    name: string
    image: string
  }
  mainImage: {
    asset: {
      url: string
    }
  }
  comments: comment[]
  slug: {
    current: string
  }
  body: [object]
}

export interface Comment {
  comment: string
  aprooved: boolean
  _id: string
  _createdAt: string
  _rev: string
  _type: string
  _updatedAt: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
}
