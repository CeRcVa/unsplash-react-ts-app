import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPhotos, SearchPhotosResult } from "../api/unsplash";

export const useInfinitePhotos = (keyword: string) => {
  return useInfiniteQuery<SearchPhotosResult>({
    queryKey: ["search", keyword],
    queryFn: ({ pageParam = 1 }) => searchPhotos(keyword, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.results.length === 0) return undefined;
      return (lastPage.page || 1) + 1;
    },
    staleTime: 1000 * 60 * 10, // cache 10 min
  });
};
