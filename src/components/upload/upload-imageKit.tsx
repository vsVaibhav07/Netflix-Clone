"use client";
import { IKContext, IKUpload } from "imagekitio-react";
import { useState } from "react";
import { Progress } from "../ui/progress";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT as string;

const authenticator = async () => {
  const response = await fetch("/api/upload-auth");
  if (!response.ok) throw new Error("Auth failed");
  return response.json();
};

type IkUploadResponse = {
  fileId: string;
  name: string;
  url: string;
  thumbnailurl?: string;
  filePath: string;
  height?: number;
  width?: number;
  size: number;
};

type IkUploadProps = {
  setvideoUrl?: (url: string) => void;
  setthumbnailurl?: (url: string) => void;
};

export default function Upload({ setvideoUrl, setthumbnailurl }: IkUploadProps) {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: unknown) => {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Upload failed");
    }
    setUploadProgress(null);
  };

  const onSuccess = (res: IkUploadResponse) => {
  if (setvideoUrl && res.url) setvideoUrl(res.url);
  if (setthumbnailurl && res.url) setthumbnailurl(res.url); // ✅ fix
  setUploadProgress(100);
  setError(null);
};

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        validateFile={(file: File) => file.size < 20 * 1024 * 1024}
        folder="/netflix-uploads"
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={(evt: ProgressEvent) => {
          if (evt.lengthComputable) {
            const progress = Math.round((evt.loaded / evt.total) * 100);
            setUploadProgress(progress);
          }
        }}
        onUploadStart={() => setUploadProgress(0)}
        className="mt-1 block w-full text-sm text-gray-100 file:mr-4 file:px-4 file:py-2 file:rounded-md"
      />

      {uploadProgress !== null && (
        <div className="mt-4">
          <Progress
            value={uploadProgress}
            className="h-2 bg-gray-200 [&>[data-progress]]:bg-blue-500"
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </IKContext>
  );
}
