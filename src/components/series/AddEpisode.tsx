"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Upload from "../upload/upload-imageKit";

const EpisodeFormDialog = ({ seriesId }: { seriesId: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seasonNumber, setSeasonNumber] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [thumbnailurl, setthumbnailurl] = useState<string>("");
  const [videoUrl, setvideoUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("seasonNumber", seasonNumber);
      formData.append("episodeNumber", episodeNumber);
      formData.append("seriesId", seriesId);

      if (thumbnailurl) {
        formData.append("thumbnailurl", thumbnailurl); 
      }
      if (videoUrl) {
        formData.append("videoUrl", videoUrl); 
      }

      const res = await fetch(`/api/episodes/${seriesId}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload episode");

      alert("Episode added successfully!");
      setTitle("");
      setDescription("");
      setSeasonNumber("");
      setEpisodeNumber("");
      setthumbnailurl("");
      setvideoUrl("");
    } catch (error) {
      console.error(error);
      alert("Error adding episode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-500 cursor-pointer">
          Add Episode
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 text-white">
        <DialogHeader>
          <DialogTitle>Add New Episode</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Episode title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Episode description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="season">Season Number</Label>
            <Input
              id="season"
              type="number"
              placeholder="Season number"
              value={seasonNumber}
              onChange={(e) => setSeasonNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="episode">Episode Number</Label>
            <Input
              id="episode"
              type="number"
              placeholder="Episode number"
              value={episodeNumber}
              onChange={(e) => setEpisodeNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail File</Label>
            <Upload setthumbnailurl={setthumbnailurl} />
          </div>

          <div className="space-y-2">
            <Label>Video File</Label>
            <Upload setvideoUrl={setvideoUrl} />
          </div>

          <Button disabled={loading || !title || !videoUrl} type="submit" className="w-full">
            {loading ? "Uploading..." : "Add Episode"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EpisodeFormDialog;
