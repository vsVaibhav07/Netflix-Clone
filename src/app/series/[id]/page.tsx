"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { Episode } from "@/generated/prisma";
import MovieDialog from "@/components/movies/MovieDialog";
import AddEpisodeDialog from "@/components/series/AddEpisode";
import { useUser } from "@clerk/nextjs";

const WebseriesPage = () => {
  const { id } = useParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploaderId,setUploaderID]=useState<string>("")
  const seriesId = id as string;

  const { user } = useUser();



  useEffect(() => {
    fetch(`/api/content/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisodes(data?.episodes);
        setUploaderID(data?.uploaderId || "");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading episodes...</p>;

  return (
    <div className="p-6 pt-20 max-w-6xl mx-auto w-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Episodes</h1>
        {user && user.id===uploaderId && <AddEpisodeDialog seriesId={seriesId} />}
        
      </div>

      <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {episodes.map((ep) => (
          <div
            key={ep.id}
            className="gap-4 p-4 h-fit flex flex-col rounded-xl bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 transition"
          >
            <MovieDialog content={ep} />

            <div>
              <h2 className="text-lg font-semibold">
                {`S${ep.seasonNumber} • E${ep.episodeNumber}`} — {ep.title}
              </h2>
              <p className="text-sm text-gray-300  mt-1">{ep.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebseriesPage;
