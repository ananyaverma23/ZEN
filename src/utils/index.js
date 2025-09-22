import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to combine multiple class names into a single string,
 * resolving any Tailwind CSS class conflicts.
 *
 * @param {...(string|object|Array)} inputs - A list of class names to be combined.
 * @returns {string} The merged and optimized class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}