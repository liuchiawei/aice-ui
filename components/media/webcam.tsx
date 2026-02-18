"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// default video and audio settings
const mediaConfig = {
  video: {
    width: 640,
    height: 360,
    facingMode: "user",
  },
  audio: false,
  errorMessage: "Unable to access camera",
};

function mergeRefs<T>(
  ref: React.Ref<T> | undefined,
  localRef: React.MutableRefObject<T | null>,
) {
  return (el: T | null) => {
    localRef.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) (ref as React.MutableRefObject<T | null>).current = el;
  };
}

interface WebcamProps {
  width?: number; // Video width, default: 640
  height?: number; // Video height, default: 360
  audio?: boolean; // Audio, default: false
  className?: string; // <video> Class name
  containerClassName?: string; // Container class name
}

export const Webcam = forwardRef<HTMLVideoElement, WebcamProps>(function Webcam(
  {
    width = mediaConfig.video.width,
    height = mediaConfig.video.height,
    audio = mediaConfig.audio,
    className,
    containerClassName,
  },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    async function initCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: width,
            height: height,
            facingMode: mediaConfig.video.facingMode,
          },
          audio: audio,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setError(
          err instanceof Error ? `${err.message}` : mediaConfig.errorMessage,
        );
      }
    }

    initCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full h-full",
        containerClassName,
      )}
    >
      {error ? (
        <p
          role="alert"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500"
        >
          {error}
        </p>
      ) : null}
      <video
        ref={mergeRefs(ref, videoRef)}
        autoPlay
        playsInline
        muted
        className={cn(
          "w-full h-full aspect-video bg-black object-cover scale-x-[-1] rounded-xs",
          className,
        )}
      />
    </div>
  );
});
