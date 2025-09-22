"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * The main container for a collapsible component, which manages the open/closed state.
 */
const Collapsible = CollapsiblePrimitive.Root;

/**
 * The element that triggers the toggling of the collapsible content.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

/**
 * The container for the content that can be shown or hidden.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };