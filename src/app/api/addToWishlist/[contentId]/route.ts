import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  context: { params: { contentId: string } } // ✅ only params allowed here
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response("Please log in first!", { status: 401 });
    }

    const { contentId } = context.params;

    const alreadyInWishlist = await prisma.user.findFirst({
      where: {
        id: userId,
        wishlist: {
          some: { id: contentId },
        },
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        wishlist: alreadyInWishlist
          ? { disconnect: { id: contentId } }
          : { connect: { id: contentId } },
      },
      include: { wishlist: true },
    });

    revalidatePath("/profile/favourites");

    return NextResponse.json({
      wishlist: updatedUser.wishlist,
      status: alreadyInWishlist ? "removed" : "added",
    });
  } catch (_error) {
    console.error("Error toggling wishlist:", _error);
    return new Response("Internal error", { status: 500 });
  }
}
