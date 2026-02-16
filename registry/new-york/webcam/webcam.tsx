"use client";

import { forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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

export const Webcam = forwardRef<HTMLVideoElement, { className?: string }>(
  function Webcam({ className }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      let stream: MediaStream | null = null;

      async function initCamera() {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: mediaConfig.video.width,
              height: mediaConfig.video.height,
              facingMode: mediaConfig.video.facingMode,
            },
            audio: mediaConfig.audio,
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
      <div className="relative flex items-center justify-center w-full h-full">
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
            "bg-black aspect-video object-cover scale-x-[-1] rounded-xs",
            className,
          )}
        />
      </div>
    );
  },
);
