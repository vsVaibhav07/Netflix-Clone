"use client";

import MovieDialog from "@/components/movies/MovieDialog";
import React, { useEffect, useState, Suspense } from "react";
import { Content } from "@/generated/prisma";

interface SearchResults {
  inTitle: Content[];
  inCategory: Content[];
  inGenres: Content[];
}

const SearchContent = ({ query }: { query: string | null }) => {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchContent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?resultFor=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching content:", err);
        setResults(null);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [query]);

  const inTitle = results?.inTitle ?? [];
  const inCategory = results?.inCategory ?? [];
  const inGenres = results?.inGenres ?? [];
  const hasResults = inTitle.length > 0 || inCategory.length > 0 || inGenres.length > 0;

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;

  return (
    <div className="h-full w-full p-4 md:p-8">
      <h2 className="text-white text-2xl md:text-3xl mt-10 italic mb-6">
        Search results for &quot;{query}&quot; ...
      </h2>
      {!hasResults && <p className="text-gray-400 text-lg text-center mt-10">No results found.</p>}

      {inTitle.length > 0 && (
        <div className="mb-8">
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">In Titles:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {inTitle.map((item) => (
              <div key={item.id} className="mb-4">
                <MovieDialog content={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {inCategory.length > 0 && (
        <div className="mb-8">
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">In Category:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {inCategory.map((item) => (
              <div key={item.id} className="mb-4">
                <MovieDialog content={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      {inGenres.length > 0 && (
        <div className="mb-8">
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-4">In Genres:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {inGenres.map((item) => (
              <div key={item.id} className="mb-4">
                <MovieDialog content={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchWrapper = () => {
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("resultFor"));
  }, []);

  if (!query) return <p className="text-white text-center mt-20">No search query provided.</p>;

  return <SearchContent query={query} />;
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-white text-center mt-20">Loading...</p>}>
      <SearchWrapper />
    </Suspense>
  );
}
