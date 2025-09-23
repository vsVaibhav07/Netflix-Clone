import ContentRow from "@/components/movies/ContentRow";
import SeriesRow from "@/components/series/SeriesRow";
import MovieBanner from "@/components/movies/movie-banner";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let allContent = null;
  try {
    allContent = await prisma.content.findMany({
    orderBy: { createdAt: "desc" },
  });
    
  } catch (error) {
    return <div className="text-2xl h-screen w-screen text-white">
      Unable to Connect
    </div>
  }
  

  if (!allContent || allContent.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-800 text-6xl text-white">
        Please wait...
      </div>
    );
  }

  const movies = allContent.filter((item) => item.category === "Movie");
  const webSeries = allContent.filter((item) => item.category === "Web-Series");
  const tvSerials = allContent.filter((item) => item.category === "TV-Serial");


  const bannerContent = allContent.filter((item) => item.videoUrl);

  const allGenres = [
    "Action",
    "Comedy",
    "Thriller",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
  ];

  return (
    <div className="relative w-full bg-black text-white">
      <section className="top-0 bg-white p-0 m-0">
        <MovieBanner content={bannerContent} />
      </section>

      <main className="relative z-20 flex flex-col items-center justify-center bg-gray-950 px-6 py-16 text-center">
        <section className="mt-12 flex w-full flex-col gap-12 px-8 text-left">
          
         
          {movies.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Movies</h2>
              {allGenres.map((genre) => {
                const genreMovies = movies.filter((item) =>
                  item.genres.includes(genre)
                );
                if (genreMovies.length === 0) return null;

                return (
                  <div key={`movie-${genre}`}>
                    <h3 className="text-2xl mb-2">{genre}</h3>
                    <ContentRow category={genre} content={genreMovies} />
                  </div>
                );
              })}
            </div>
          )}

         
          {webSeries.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Web Series</h2>
              {allGenres.map((genre) => {
                const genreSeries = webSeries.filter((item) =>
                  item.genres.includes(genre)
                );
                if (genreSeries.length === 0) return null;

                return (
                  <div key={`series-${genre}`}>
                    <h3 className="text-2xl mb-2">{genre}</h3>
                    <SeriesRow category={genre} content={genreSeries} />
                  </div>
                );
              })}
            </div>
          )}

       
          {tvSerials.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-4">TV Serials</h2>
              {allGenres.map((genre) => {
                const genreSerials = tvSerials.filter((item) =>
                  item.genres.includes(genre)
                );
                if (genreSerials.length === 0) return null;

                return (
                  <div key={`tv-${genre}`}>
                    <h3 className="text-2xl mb-2">{genre}</h3>
                    <SeriesRow category={genre} content={genreSerials} />
                  </div>
                );
              })}
            </div>
          )}

        </section>
      </main>
    </div>
  );
}
