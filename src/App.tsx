import { useState } from "react";
import SearchInput from "./components/SearchInput";
import PhotoGrid from "./components/PhotoGrid";

export default function App() {
  const [keyword, setKeyword] = useState("nature");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Unsplash Photo Explorer
      </h1>
      <SearchInput onChange={setKeyword} />
      <PhotoGrid keyword={keyword} />
    </div>
  );
}
