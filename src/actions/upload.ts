"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const UploadVideoSchema = z.object({
  movieName: z.string().min(1, "Movie Name is required!"),
  description: z.string().min(1, "Description is required!"),
  category: z.string().min(1, "Category is required!"),
  genres: z.array(z.string()).optional(),
  videoUrl: z.string().url("Invalid Video Url!"),
  thumbnailUrl: z.string().optional(),
});

type UploadVideoFormState = {
  errors?: {
    movieName?: string[];
    description?: string[];
    category?: string[];
    genres?: string[];
    videoUrl?: string[];
    thumbnailUrl?: string[];
    formErrors?: string[];
  };
};

export const uploadVideoAction = async (
  prevState: UploadVideoFormState,
  formData: FormData
): Promise<UploadVideoFormState> => {
  const rawData: any = Object.fromEntries(formData.entries());

  if (rawData.genres && typeof rawData.genres === "string") {
    rawData.genres = rawData.genres.split(",");
  }

  const result = UploadVideoSchema.safeParse(rawData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    const { movieName, description, category, genres, videoUrl, thumbnailUrl } = result.data;

    await prisma.movie.create({
      data: {
        moviename: movieName,        // ✅ DB field
        description,                 // ✅ same name
        category,                    // ✅ same name
        genres,                      // ✅ text[]
        videourl: videoUrl,          // ✅ DB field
        thumbnailurl: thumbnailUrl,  // ✅ DB field
      },
    });
  } catch (error) {
    return {
      errors: {
        formErrors: [error instanceof Error ? error.message : String(error)],
      },
    };
  }

  revalidatePath("/");
  redirect("/");
};
