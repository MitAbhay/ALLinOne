export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  auther: {
    name: string,
    image: string
  };
  mainImage: {
    asset: {
      url: string
    }
  };
  slug: {
    current: string
  };
  body: [object] ;
}
