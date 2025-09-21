"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Content } from "@/generated/prisma";

import SeriesRow from "@/components/series/SeriesRow";

import ContentRow from "@/components/movies/ContentRow";
import UploadDialogForm from "@/components/upload/upload-form-fields";

type UserContentResponse = {
  movies: Content[];
  webSeries: Content[];
  tvSerials: Content[];
};

export default function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [content, setContent] = useState<UserContentResponse | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      setLoadingContent(true);
      fetch(`/api/fetchUserContent?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setContent(data);
          setLoadingContent(false);
  
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load content");
          setLoadingContent(false);
        });
    }
  }, [user?.id]);

  if (!isLoaded) return <p>Loading user...</p>;
  if (loadingContent) return <p>Loading Movies and Series...</p>;
  if (!isSignedIn) return <p>Please sign in first.</p>;
  if(error) return <div className="flex flex-col h-screen w-screen justify-center items-center"><h2>Something Went Wrong!</h2><p>{error}</p></div> ;
  if (!user) return <p>No user found</p>;

  return (
    <div className="p-6 pt-20">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Welcome {user.firstName}</h1>
        <UploadDialogForm/>
        <p className="hidden sm:block"></p>
      </div>

      {content?.movies && content?.movies.length > 0 && (
        <div className="m-10">
          <h2 className=" font-bold text-lg"> Your Movies</h2>
          <ContentRow content={content.movies} />
        </div>
      )}
      {content?.webSeries && content.webSeries.length > 0 && (
        <div className="m-10  relative">
          
          <h2 className=" font-bold text-lg">Your Webseries</h2>
          <SeriesRow content={content.webSeries} />
        </div>
      )}
      {content?.tvSerials && content.tvSerials.length > 0 && (
        <div className="m-10 relative">
          <h2 className=" font-bold text-lg">Your TV Shows</h2>
          <SeriesRow content={content.tvSerials} />
        </div>
      )}
    </div>
  );
}
