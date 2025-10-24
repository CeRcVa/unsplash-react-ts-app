import React from "react";
import { Photo } from "../api/unsplash";

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-black"
        >
          ✕
        </button>
        <img
          src={photo.urls.full}
          alt={photo.alt_description || "Unsplash Image"}
          className="rounded-lg w-full mb-3"
        />
        <h2 className="text-lg font-semibold">
          {photo.description || photo.alt_description || "No description"}
        </h2>
        <p className="text-sm text-gray-600">By: {photo.user.name}</p>
        <p className="text-sm text-gray-600">❤️ {photo.likes}</p>
      </div>
    </div>
  );
}
