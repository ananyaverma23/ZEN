import { cn } from "../../utils";

/**
 * A component used to show a placeholder preview of content before the data has loaded.
 * @param {object} props - The component props.
 * @param {string} props.className - Additional classes to apply to the skeleton component.
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };