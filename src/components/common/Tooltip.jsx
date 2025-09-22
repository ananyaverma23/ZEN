"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../utils";

/**
 * The provider that enables tooltips within its scope.
 * It should wrap the part of your application where you want to use tooltips.
 */
const TooltipProvider = TooltipPrimitive.Provider;

/**
 * The root container for a tooltip component.
 */
const Tooltip = TooltipPrimitive.Root;

/**
 * The trigger element that will show the tooltip on hover or focus.
 */
const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * The main content container for the tooltip.
 */
const TooltipContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };