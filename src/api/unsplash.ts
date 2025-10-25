import axios from "axios";

const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
  },
});

export interface Photo {
  id: string;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  alt_description?: string;
  description?: string;
  likes: number;
  user: { name: string };
}

export interface SearchPhotosResult {
  total: number;
  total_pages: number;
  results: Photo[];
  page?: number;
}

export const searchPhotos = async (
  keyword: string,
  page: number = 1
): Promise<SearchPhotosResult> => {
  const response = await unsplashApi.get("/search/photos", {
    params: { query: keyword || "nature", per_page: 20, page },
  });
  return { ...response.data, page };
};
