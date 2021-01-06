export interface Movie {
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
  ];
}
