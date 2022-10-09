interface IGame {
  id: number,
  slug: string,
  name: string,
  price: number,
  ratings_count: number,
  description_raw: string,
  website: string,
  released: string,
  background_image: string,
  metacritic: number,
  rating: number,
  developers: {
    name: string,
    id: number
  }[],
  publishers: {
    name: string,
    id: number
  }[],
  parent_platforms: {
    platform: {
      id: number,
      slug: string,
      name: string,
    }
  }[],
  platforms: {
    platform: {
      id: number,
      slug: string,
      name: string,
    }
  }[],
  genres: {
    name: string,
  }[],
  short_screenshots: {
    id: number,
    image: string,
  }[],
  amount: number
}

export type { IGame };