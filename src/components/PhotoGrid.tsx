import { useState, useEffect } from "react";
import { useInfinitePhotos } from "../hooks/useInfinitePhotos";
import PhotoModal from "./PhotoModal";
import { UnsplashPhoto } from "../hooks/useInfinitePhotos";

interface PhotoGridProps {
  keyword: string;
}

export default function PhotoGrid({ keyword }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<UnsplashPhoto | null>(null);
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    error 
  } = useInfinitePhotos(keyword);

  const photos = data?.pages.flatMap((p) => p.results) || [];

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className="text-center mt-4">Loading photos...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error loading photos: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.small}
          alt={photo.alt_description || "Photo"}
          className="rounded-lg cursor-pointer hover:opacity-80 transition"
          loading="lazy"
          onClick={() => setSelectedPhoto(photo)}
        />
      ))}

      {isFetchingNextPage && (
        <div className="col-span-full text-center mt-4">Loading more photos...</div>
      )}

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
}