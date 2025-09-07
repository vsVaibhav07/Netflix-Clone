import { prisma } from "@/lib/prisma";
export const fetchMoviesByCategory = async (category) => {
  const movies = await prisma.movie.findMany({
    where: { category },
    orderBy: { createdat: "desc" },
  });
    return movies;
};
