"use client";

import { useState, useEffect } from "react";

/**
 * An image component that displays a fallback image if the primary source fails to load.
 * @param {object} props - The component props.
 * @param {string} props.src - The primary image source URL.
 * @param {string} props.fallback - The fallback image source URL to use if the primary source fails.
 * @param {object} props.props - Any other props to be passed to the underlying `<img>` element.
 */
export function ImageWithFallback({ src, fallback, ...props }) {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <img
      src={error ? fallback : src}
      onError={() => setError(true)}
      {...props}
    />
  );
}