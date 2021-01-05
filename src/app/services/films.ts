export interface Film {
  categories: [
    {
      videos: [
        {
          description: string,
          sources: [string],
          subtitle: string,
          thumb: string,
          title: string
        }
      ]
    }
  ]
}
