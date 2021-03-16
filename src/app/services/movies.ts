export interface Movie {
  categories: [
    {
      videos: [
        {
          description: string,
          sources: [string],
          subtitle?: string,
          thumb?: string,
          title: string
        }
      ]
    }
  ];
}

export interface Movies {
  description: string,
  sources: [string],
  subtitle?: string,
  thumb?: string,
  title: string,
  genre?: string,
  ratingValue?: number,
  _id?: string,
  _v?: number
}

export interface Comment {
  text: string,
  author: string,
  date: Date,
  userId: string,
  movieId: string
}
