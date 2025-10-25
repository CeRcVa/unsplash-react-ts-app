import { UnsplashPhoto } from "../hooks/useInfinitePhotos";

interface PhotoModalProps {
  photo: UnsplashPhoto;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-4 rounded max-w-lg max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
        <img src={photo.urls.regular} alt={photo.alt_description || "Photo"} className="w-full h-auto" />
        <p className="mt-2 text-gray-700">By: {photo.user.name}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}