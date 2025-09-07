import Navbar from "@/components/ui/header/Navbar";
import { prisma } from "@/lib/prisma";
import MovieBanner from "@/components/movies/movie-banner";
import MovieRow from "@/components/movies/MovieRow";

const allGenres = ["Action", "Comedy", "Thriller", "Drama", "Horror", "Romance", "Sci-Fi"];

export default async function Home() {
  const movies = await prisma.movie.findMany({
    orderBy: { createdat: "desc" },
  });


  const genreMovies = await Promise.all(
    allGenres.map(async (genre) => {
      const moviesByGenre = await prisma.movie.findMany({
        where: { genres: { has: genre } },
        orderBy: { createdat: "desc" },
      });
      return { genre, movies: moviesByGenre };
    })
  );
  if(!movies ){
    return (
      <div className="h-screen w-screen flex justify-centert items-center text-6xl bg-gray-800 text-white ">
        
        Please wait...
      </div>
    )
  }

  return (
    <div className="w-full relative flex flex-col bg-black text-white">
      <div className="fixed bg-gray-950 top-0 w-full z-50">
        <Navbar />
      </div>
      <section className="pt-12">
        {movies && <MovieBanner movies={movies} />}
      </section>
      <main className="relative z-20 flex flex-col items-center justify-center px-6 py-16 text-center bg-gray-950">
        <section className="mt-12 px-8 w-full text-left flex flex-col gap-8">
          {genreMovies.map(({ genre, movies }) => (
            <MovieRow key={genre} genre={genre} movies={movies} />
          ))}
        </section>
      </main>
    </div>
  );
}
