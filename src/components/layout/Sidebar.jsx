import * as React from "react";
import { cn } from "../../utils";

/**
 * The main container for a sidebar component.
 */
const Sidebar = React.forwardRef(({ className, ...props }, ref) => (
  <aside
    ref={ref}
    className={cn("flex h-full flex-col", className)}
    {...props}
  />
));
Sidebar.displayName = "Sidebar";

/**
 * The header section of a sidebar.
 */
const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center gap-2 border-b px-6", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

/**
 * The title element for a sidebar, to be used inside a SidebarHeader.
 */
const SidebarHeaderTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-base font-semibold", className)}
    {...props}
  />
));
SidebarHeaderTitle.displayName = "SidebarHeaderTitle";

/**
 * The main content area of a sidebar.
 */
const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

/**
 * A navigation section within the sidebar content.
 */
const SidebarNav = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("grid gap-1 px-3 py-4", className)}
    {...props}
  />
));
SidebarNav.displayName = "SidebarNav";

/**
 * The main container for a navigation list within the sidebar.
 */
const SidebarNavMain = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props} />
));
SidebarNavMain.displayName = "SidebarNavMain";

/**
 * A link item within a navigation list.
 */
const SidebarNavLink = React.forwardRef(
  ({ className, active, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium",
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted",
        className
      )}
      {...props}
    />
  )
);
SidebarNavLink.displayName = "SidebarNavLink";

/**
 * A section with a title for grouping navigation links.
 */
const SidebarNavSection = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col pt-4", className)} {...props} />
));
SidebarNavSection.displayName = "SidebarNavSection";

/**
 * The title for a navigation section.
 */
const SidebarNavSectionTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "px-3 py-2 text-xs font-semibold text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
SidebarNavSectionTitle.displayName = "SidebarNavSectionTitle";

/**
 * The footer section of a sidebar.
 */
const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-auto border-t p-6", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

export {
  Sidebar,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarContent,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
  SidebarNavSection,
  SidebarNavSectionTitle,
  SidebarFooter,
};