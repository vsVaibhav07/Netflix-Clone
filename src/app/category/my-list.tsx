// // import { currentUser } from "@clerk/nextjs/server";
// // import { prisma } from "@/lib/prisma";
// // import MovieRow from "@/components/content/MovieRow";

// interface CategoryPageProps {
//   params: { slug: string };
// }

// export default async function CategoryPage({ params }: CategoryPageProps) {
//   const { slug } = params;

//   if (slug === "my-list") {
//     const user = await currentUser();

//     if (!user) {
//       return <p className="text-white p-6">Please log in to view your list.</p>;
//     }

//     const myList = await prisma.userMovieList.findMany({
//       where: { userId: user.id },
//       include: { movie: true },
//     });

//     return (
//       <div className="min-h-screen bg-black text-white p-6">
//         <h1 className="text-2xl font-bold mb-6">My List</h1>
//         <MovieRow category="My List" content={myList.map((m) => m.movie)} />
//       </div>
//     );
//   }


// }
