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
  description: string;
  sources: [string];
  subtitle?: string;
  thumb?: string;
  title: string;
  genre?: string;
}
