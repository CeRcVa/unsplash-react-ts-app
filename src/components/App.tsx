// import React, { useCallback, useRef, useState } from 'react';
// import SearchInput from './SearchInput';
// import useDebounce from '../hooks/useDebounce';
// import { useInfinitePhotos } from '../hooks/useInfinitePhotos';
// import PhotoCard from './PhotoCard';
// import PhotoModal from './PhotoModal';

// export default function App() {
//   const [term, setTerm] = useState('');
//   const debounced = useDebounce(term, 400);
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfinitePhotos(debounced);
//   const [openId, setOpenId] = useState<string | null>(null);

//   const observer = useRef<IntersectionObserver | null>(null);
//   const photos = data?.pages.flatMap((p: any) => p.results) ?? [];

//   const lastRef = useCallback((node: HTMLDivElement | null) => {
//     if (isFetchingNextPage) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
//     });
//     if (node) observer.current.observe(node);
//   }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

//   return (
//     <div className='max-w-6xl mx-auto p-4'>
//       <h1 className='text-2xl mb-4'>Unsplash Browser</h1>
//       <SearchInput value={term} onChange={setTerm} />
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
//         {photos.map((photo, idx) => {
//           if (idx === photos.length - 1) {
//             return <div key={photo.id} ref={lastRef as any}><PhotoCard photo={photo} onOpen={setOpenId} /></div>;
//           }
//           return <div key={photo.id}><PhotoCard photo={photo} onOpen={setOpenId} /></div>;
//         })}
//       </div>
//       <div className='mt-4 text-center'>{isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll to load more' : 'No more photos'}</div>
//       <PhotoModal id={openId} onClose={() => setOpenId(null)} />
//     </div>
//   );
// }
