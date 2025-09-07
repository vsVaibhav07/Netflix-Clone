"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Upload from "./upload-imageKit";
import { uploadVideoAction } from "@/actions/upload";

const allGenres = ["Action", "Comedy", "Thriller", "Drama", "Horror", "Romance", "Sci-Fi"];
const categories = ["Movie", "Web-Series", "TV-Serial"];

const UploadFormFields = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [genres, setGenres] = useState<string[]>([]);

  const [state, formAction, isPending] = React.useActionState(uploadVideoAction, { errors: {} });

  const toggleGenre = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  return (
    <div className="w-[50%] p-6 rounded-2xl shadow-lg bg-white/5 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-gray-100">🎬 Add New Movie</h1>
      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="movieName">Movie Name</Label>
          <Input id="movieName" name="movieName" type="text" placeholder="Enter Movie Name" />
          {state.errors?.movieName && <p className="text-red-500 text-sm">{state.errors.movieName[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" type="text" placeholder="Enter Description" />
          {state.errors?.description && <p className="text-red-500 text-sm">{state.errors.description[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select id="category" name="category" className="w-full p-2 rounded ">
            <option className="bg-gray-700" value="">Select Category</option>
            {categories.map((c) => (
              <option className="bg-gray-700" key={c} value={c}>{c}</option>
            ))}
          </select>
          {state.errors?.category && <p className="text-red-500 text-sm">{state.errors.category[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label>Genres</Label>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <label key={genre} className="flex items-center space-x-2">
                <input type="checkbox" checked={genres.includes(genre)} onChange={() => toggleGenre(genre)} />
                <span>{genre}</span>
              </label>
            ))}
          </div>
          <input type="hidden" name="genres" value={genres.join(",")} />
        </div>

        <div>
          <Label>Thumbnail File</Label>
          <Upload setThumbnailUrl={setThumbnailUrl} />
          <input type="hidden" name="thumbnailUrl" value={thumbnailUrl} />
        </div>

        <div>
          <Label>Video File</Label>
          <Upload setVideoUrl={setVideoUrl} />
          <input type="hidden" name="videoUrl" value={videoUrl} />
        </div>

        {state.errors?.formErrors && (
          <div className="text-red-500 text-sm">{state.errors.formErrors.join(", ")}</div>
        )}

        <Button
          type="submit"
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={isPending || !videoUrl || !thumbnailUrl || genres.length === 0}
        >
          {isPending ? "Please wait..." : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default UploadFormFields;
