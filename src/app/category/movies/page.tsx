import ContentRow from "@/components/movies/ContentRow";
import { prisma } from "@/lib/prisma";

export default async function MoviesPage() {
  const allContent = await prisma.content.findMany({
    where: { category: "Movie" }, 
    orderBy: { createdAt: "desc" },
  });



  const allGenres = [
    "Action",
    "Comedy",
    "Thriller",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
  ];

  const contentByGenre = allGenres.map((genre) => {
    const content = allContent.filter((item) => item.genres.includes(genre));
    return { genre, content };
  });

  if (!allContent || allContent.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-800 text-6xl text-white">
        Please wait...
      </div>
    );
  }




  return (
    <div className="relative w-full bg-black text-white">

      
      <main className="relative z-20 flex flex-col items-center justify-center bg-gray-950 px-6 py-16 text-center">
        <section className="mt-12 flex w-full flex-col gap-8 px-8 text-left">
          {contentByGenre.map(({ genre, content }) => {
           
            if (content.length === 0) {
              return null;
            }

            return (
              <div key={genre}>
                <h2 className="text-2xl text-white">{genre}</h2>
                <ContentRow category={genre} content={content} />
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}
