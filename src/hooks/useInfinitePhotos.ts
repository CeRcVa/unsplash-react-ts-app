import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

export interface UnsplashResponse {
  results: UnsplashPhoto[];
  total_pages: number;
}

export const useInfinitePhotos = (query: string) => {
  return useInfiniteQuery<UnsplashResponse>({
    queryKey: ['photos', query],
    queryFn: async (context) => {
      const pageParam = (context.pageParam as number) || 1;
      const res = await axios.get<UnsplashResponse>(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query,
            page: pageParam,
            per_page: 20,
            client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
          },
        }
      );
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};