"use client";

import { uploadVideoAction } from "@/actions/upload";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Upload from "./upload-imageKit";

const allGenres = [
  "Action",
  "Comedy",
  "Thriller",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
];
const categories = ["Movie", "Web-Series", "TV-Serial"];

const UploadDialogForm = () => {
  const [videoUrl, setvideoUrl] = useState<string>("");
  const [thumbnailurl, setthumbnailurl] = useState<string>("");
  const [genres, setGenres] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  const [state, formAction, isPending] = React.useActionState(uploadVideoAction, {
    errors: {},
  });

  const toggleGenre = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  return (
    <Dialog  >
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
          ➕ Add New Content
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-h-[90vh] overflow-y-scroll bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">🎬 Add New Content</DialogTitle>
        </DialogHeader>

        <form action={formAction} className="w-fit space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" className="w-full" name="title" type="text" placeholder="Enter Title" />
            {state.errors?.title && (
              <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Enter Description"
            />
            {state.errors?.description && (
              <p className="text-red-500 text-sm">{state.errors.description[0]}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2 bg-gray-900">
            <Label htmlFor="category" className="text-white">Category</Label>
            <select
              id="category"
              name="category"
              className="w-full p-2 rounded-md text-white focus-visible:border-ring focus-visible:ring-ring/50 shadow-sm focus-visible:ring-[3px] border border-input"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option className="text-gray-200 bg-gray-800" value="">Select Category</option>
              {categories.map((c) => (
                <option className="text-gray-200 bg-gray-800" key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {state.errors?.category && (
              <p className="text-red-500 text-sm">{state.errors.category[0]}</p>
            )}
          </div>

          
          <div className="space-y-2">
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((genre) => (
                <label key={genre} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={genres.includes(genre)}
                    onChange={() => toggleGenre(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
            <input type="hidden" name="genres" value={genres.join(",")} />
          </div>

          {/* Thumbnail */}
          <div>
            <Label>Thumbnail File</Label>
            <Upload setthumbnailurl={setthumbnailurl} />
            <input type="hidden" name="thumbnailurl" value={thumbnailurl} />
          </div>

          {/* Conditional: Movie vs Web-Series */}
          {category === "Movie" && (
            <div>
              <Label>Video File</Label>
              <Upload setvideoUrl={setvideoUrl} />
              <input type="hidden" name="videoUrl" value={videoUrl} />
            </div>
          )}

          {category !== "Movie" && category !== "" && (
            <div className="p-3 rounded bg-gray-800 text-sm text-gray-200">
              Episodes will be added later from the <b>Episode Upload</b> section.
            </div>
          )}

          {/* Errors */}
          {state.errors?.formErrors && (
            <div className="text-red-500 text-sm">
              {state.errors.formErrors.join(", ")}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={
              isPending ||
              !thumbnailurl ||
              genres.length === 0 ||
              (category === "Movie" && !videoUrl)
            }
          >
            {isPending ? "Please wait..." : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialogForm;
