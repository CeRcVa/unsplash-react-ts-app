import { useState, useEffect } from "react";
import { useInfinitePhotos } from "../hooks/useInfinitePhotos";
import PhotoModal from "./PhotoModal";
import { Photo } from "../api/unsplash";

interface PhotoGridProps {
  keyword: string;
}

export default function PhotoGrid({ keyword }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePhotos(keyword);

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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.small}
          alt={photo.alt_description || ""}
          className="rounded-lg cursor-pointer hover:opacity-80 transition"
          onClick={() => setSelectedPhoto(photo)}
        />
      ))}

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
}
