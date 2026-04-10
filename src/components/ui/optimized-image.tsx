"use client";

import React, {CSSProperties, useEffect, useRef, useState} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageVariant {
  name: string;
  width: number;
  height: number;
  file: string;
}

interface ImageMetadata {
  name: string;
  originalWidth: number;
  originalHeight: number;
  aspectRatio: number;
  dominantColor: string;
  variants: ImageVariant[];
  basePath: string;
  generatedAt: string;
}

interface OptimizedImageProps {
  /** Path to the image folder relative to public/, e.g. "/assets/hero" */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional className for the wrapper */
  className?: string;
  /** Optional className for the img element */
  imgClassName?: string;
  /** Optional inline style for the wrapper */
  style?: CSSProperties;
  /** Loading strategy: "lazy" (default) or "eager" */
  loading?: "lazy" | "eager";
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Priority image — disables lazy loading, preloads */
  priority?: boolean;
  /** Object-fit for the image */
  objectFit?: CSSProperties["objectFit"];
  /** Object-position for the image */
  objectPosition?: string;
  /** Fill the parent container */
  fill?: boolean;
  /** Fixed width */
  width?: number;
  /** Fixed height */
  height?: number;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback on error */
  onError?: () => void;
}

// ─── Metadata Cache ──────────────────────────────────────────────────────────

const metadataCache = new Map<string, ImageMetadata>();
const metadataPromises = new Map<string, Promise<ImageMetadata>>();

async function fetchMetadata(basePath: string): Promise<ImageMetadata> {
  if (metadataCache.has(basePath)) {
    return metadataCache.get(basePath)!;
  }

  if (metadataPromises.has(basePath)) {
    return metadataPromises.get(basePath)!;
  }

  const promise = fetch(`${basePath}/metadata.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load metadata for ${basePath}`);
      return res.json();
    })
    .then((data: ImageMetadata) => {
      metadataCache.set(basePath, data);
      metadataPromises.delete(basePath);
      return data;
    });

  metadataPromises.set(basePath, promise);
  return promise;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function OptimizedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  style,
  loading: loadingProp,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1536px) 60vw, 50vw",
  priority = false,
  objectFit = "cover",
  objectPosition = "center",
  fill = false,
  width,
  height,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(
    metadataCache.get(src) || null,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const loading = priority ? "eager" : loadingProp || "lazy";

  // Fetch metadata
  useEffect(() => {
    fetchMetadata(src)
      .then(setMetadata)
      .catch(() => {
        setHasError(true);
        onError?.();
      });
  }, [src, onError]);

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {rootMargin: "200px"},
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, isInView]);

  // Build srcSet from variants
  const getSrcSet = (): string => {
    if (!metadata) return "";
    const imageVariants = metadata.variants.filter(
      (v) => v.name !== "placeholder",
    );
    return imageVariants
      .map((v) => `${metadata.basePath}/${v.file} ${v.width}w`)
      .join(", ");
  };

  // Get the default src (md or largest available)
  const getDefaultSrc = (): string => {
    if (!metadata) return "";
    const md = metadata.variants.find((v) => v.name === "md");
    if (md) return `${metadata.basePath}/${md.file}`;
    const lastVariant = metadata.variants[metadata.variants.length - 1];
    return `${metadata.basePath}/${lastVariant.file}`;
  };

  // Get placeholder src
  const getPlaceholderSrc = (): string => {
    if (!metadata) return "";
    const placeholder = metadata.variants.find((v) => v.name === "placeholder");
    if (placeholder) return `${metadata.basePath}/${placeholder.file}`;
    return "";
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // ─── Styles ──────────────────────────────────────────────────────────────

  const aspectRatio = metadata?.aspectRatio;

  const wrapperStyle: CSSProperties = {
    position: fill ? "absolute" : "relative",
    overflow: "hidden",
    ...(fill
      ? {inset: 0, width: "100%", height: "100%"}
      : {
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : undefined,
          aspectRatio: !height && aspectRatio ? `${aspectRatio}` : undefined,
        }),
    ...style,
  };

  const placeholderStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit,
    objectPosition,
    filter: "blur(20px)",
    transform: "scale(1.1)",
    transition: "opacity 0.5s ease-in-out",
    opacity: isLoaded ? 0 : 1,
    zIndex: 1,
  };

  const dominantColorStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    backgroundColor: metadata?.dominantColor || "#e5e7eb",
    transition: "opacity 0.5s ease-in-out",
    opacity: isLoaded ? 0 : 1,
    zIndex: 0,
  };

  const imgStyle: CSSProperties = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit,
    objectPosition,
    transition: "opacity 0.5s ease-in-out",
    opacity: isLoaded ? 1 : 0,
    zIndex: 2,
    position: fill ? "absolute" : undefined,
    inset: fill ? 0 : undefined,
  };

  // ─── Error State ────────────────────────────────────────────────────────

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          ...wrapperStyle,
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: "0.875rem",
        }}
      >
        <span>Failed to load image</span>
      </div>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className={className} style={wrapperStyle}>
      {/* Dominant color background */}
      <div style={dominantColorStyle} aria-hidden="true" />

      {/* Blur placeholder */}
      {metadata && getPlaceholderSrc() && (
        <img
          src={getPlaceholderSrc()}
          alt=""
          aria-hidden="true"
          style={placeholderStyle}
          draggable={false}
        />
      )}

      {/* Main image — only render when in view */}
      {isInView && metadata && (
        <picture>
          <source type="image/webp" srcSet={getSrcSet()} sizes={sizes} />
          <img
            src={getDefaultSrc()}
            srcSet={getSrcSet()}
            sizes={sizes}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={imgClassName}
            style={imgStyle}
            width={metadata.originalWidth}
            height={metadata.originalHeight}
            decoding={priority ? "sync" : "async"}
            draggable={false}
          />
        </picture>
      )}
    </div>
  );
}
