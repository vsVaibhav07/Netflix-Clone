import { prisma } from "@/lib/prisma";
import CategoryRow from "@/components/movies/CategoryRow";

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  const categoryMap: Record<string, string> = {
    movies: "Movie",
    "tv-shows": "TV-Serial",
    "web-series": "Web-Series",
    "my-list": "",
  };

  const category = categoryMap[slug];

  if (!category) {
    return (
      <div className="min-h-screen w-full text-white p-6">
        <h1 className="text-2xl font-bold">404 - Category Not Found</h1>
      </div>
    );
  }

  let movies = [];
  try {
    movies = await prisma.movie.findMany({
      where: { category },
      orderBy: { createdat: "desc" },
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    // safe fallback
    movies = [];
  }

  return (
    <div className="min-h-screen w-full pt-10 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">
        {slug.replace("-", " ").toUpperCase()}
      </h1>

      {movies.length > 0 ? (
        <CategoryRow category={slug} movies={movies} />
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
