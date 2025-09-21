import SeriesRow from "@/components/series/SeriesRow";
import { prisma } from "@/lib/prisma";
import { Content, Episode } from "@/generated/prisma";

type ContentWithEpisodes = Content & {
  episodes?: Episode[];
};

interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  const categoryMap: Record<string, string> = {
    "tv-shows": "TV-Serial",
    "web-series": "Web-Series",
  };

  const category = categoryMap[slug];

  if (!category) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-950 p-6 text-white">
        <h1 className="text-2xl font-bold">404 - Category Not Found</h1>
      </div>
    );
  }

  let allContent: ContentWithEpisodes[] = [];

  try {
    allContent = await prisma.content.findMany({
      where: { category },
      orderBy: { createdAt: "desc" },
      include: {
        episodes: {
          orderBy: { episodeNumber: "asc" },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-950 p-6 text-white">
        <h1 className="text-2xl font-bold">
          Error loading content. Please try again later.
        </h1>
      </div>
    );
  }

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
    const content = allContent.filter((item) => item.genres?.includes(genre));
    return { genre, content };
  });

  if (!allContent || allContent.length === 0) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-800 text-6xl text-white">
        No Series Found
      </div>
    );
  }

  return (
    <div className="w-full p-6 pt-20 text-white md:pt-24 lg:pt-28">
      <h1 className="mb-6 text-2xl font-bold capitalize">
        {slug.replace("-", " ")}
      </h1>

      <section className="mt-12 flex w-full flex-col gap-8 px-8 text-left">
        {contentByGenre.map(({ genre, content }) => {
          if (content.length === 0) return null;

          return (
            <div key={genre}>
              <h2 className="text-2xl text-white">{genre}</h2>
              <SeriesRow content={content} category={genre} />
            </div>
          );
        })}
      </section>
    </div>
  );
}
