"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const UploadVideoSchema = z.object({
  title: z.string().min(1, "Movie Name is required!"),
  description: z.string().min(1, "Description is required!"),
  category: z.string().min(1, "Category is required!"),
  genres: z.array(z.string()).optional(),
  videoUrl: z.string().url("Invalid Video Url!").optional(),
  thumbnailurl: z.string().optional(),
});

type UploadVideoFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    category?: string[];
    genres?: string[];
    videoUrl?: string[];
    thumbnailurl?: string[];
    formErrors?: string[];
  };
};

export const uploadVideoAction = async (
  prevState: UploadVideoFormState,
  formData: FormData
): Promise<UploadVideoFormState> => {

 const { userId } = await auth() as { userId: string | null };
  if (!userId) {
    return { errors: { formErrors: ["User not logged in"] } };
  }

  const rawData: Record<string, unknown> = Object.fromEntries(formData.entries());

  if (rawData.genres && typeof rawData.genres === "string") {
    rawData.genres = rawData.genres.split(",");
  }

  const result = UploadVideoSchema.safeParse(rawData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    const { title, description, category, genres, videoUrl, thumbnailurl } = result.data;

    await prisma.content.create({
      data: {
        title: title,
        description,
        category,
        genres,
         videoUrl: category === "Movie" ? videoUrl : null,
        thumbnailurl: thumbnailurl,
        uploaderId:userId
      },
    });
  } catch (error: unknown) {
    return {
      errors: {
        formErrors: [error instanceof Error ? error.message : String(error)],
      },
    };
  }

  revalidatePath("/");
  redirect("/");
};
