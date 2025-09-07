import { prisma } from "@/lib/prisma";
import MovieRow from "@/components/movies/MovieRow";

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q ?? "";

  // find matches in title or description
  const results = await prisma.movie.findMany({
    where: {
      OR: [
        { moviename: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { createdat: "desc" },
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        Search results for "{query}"
      </h1>

      {results.length > 0 ? (
        <MovieRow genre="Results" movies={results} />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
