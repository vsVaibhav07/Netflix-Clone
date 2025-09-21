 "use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

const SearchBox = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/search?resultFor=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div className="relative shrink flex items-center gap-2">
      <div className="flex w-auto justify-center items-center gap-0.5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Titles, people, genres"
          className=" w-auto rounded-md bg-gray-800 px-3 py-1 text-white outline-none transition-all"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-800 w-8 h-8 p-1 flex justify-center items-center rounded-full"
        >
          <SearchIcon className="text-2xl cursor-pointer text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;