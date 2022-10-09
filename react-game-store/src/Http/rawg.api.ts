import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getRandomInt } from 'src/utils/getRandomInt';
import { Data } from 'src/types/IData';
import { IGame } from 'src/types/IGame';
import { IScreenshot } from "src/types/IScreenshot";

const api = {
  url: 'https://api.rawg.io/',
  key: '3366a1b4dadd4c14bde7747f2d465f9d',
};

export const gamesApi = createApi({
  reducerPath: 'api/games',
  baseQuery: fetchBaseQuery({ baseUrl: api.url}),
  endpoints: build => ({
    getGameList: 
      build.query<Data<IGame>, {page: number, pageSize: number, genre: string}>({
        query: (arg) => {
          const {page, pageSize, genre} = arg
          
          if (genre) return `api/games?key=${api.key}&page=${page}&page_size=${pageSize}&genres=${genre}`
          else return `api/games?key=${api.key}&page=${page}&page_size=${pageSize}`
        } 
      }),
    getGame: 
      build.query<IGame, {id: number}>({
        query: (arg) => {
          const {id} = arg
          return `api/games/${id}?key=${api.key}`
        }
      }),
    getGenres: 
      build.query({
        query: () => {
          return `api/genres?key=${api.key}`
        }
      }),
    getRandomGames: 
      build.query({
        query: ()=> {
          const randomInt = getRandomInt(100)
          return `api/games?key=${api.key}&page=${randomInt}&page_size=4`
        }
      }),
    getBestGames: 
      build.query<Data<IGame>, {pageSize: number}>({
        query: (arg)=> {
          const {pageSize} = arg
          const randomInt = getRandomInt(50)
          return `api/games?key=${api.key}&page=${randomInt}&page_size=${pageSize}&ordering=-rating`
        }
      }),
    getScreenshots: 
      build.query<Data<IScreenshot>, {id: number}>({
        query: (arg)=> {
          const {id} = arg
          return `api/games/${id}/screenshots?key=${api.key}`
        }
      }),
    getGamesBySearch: 
      build.query<Data<IGame>, {search: string}>({
        query: (arg)=> {
          const {search} = arg
          return `api/games?key=${api.key}&search=${search}`
        }
      }),
  })
})


export const {
  useGetGameListQuery, 
  useLazyGetGameListQuery,
  useGetGameQuery, 
  useLazyGetGameQuery, 
  useLazyGetGenresQuery, 
  useGetRandomGamesQuery, 
  useGetBestGamesQuery,
  useGetScreenshotsQuery,
  useGetGamesBySearchQuery
} = gamesApi

export const {
  getRandomGames
} = gamesApi.endpoints