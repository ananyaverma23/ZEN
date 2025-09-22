import { useState, useEffect } from "react";

// The screen width in pixels to consider the breakpoint for mobile devices.
const MOBILE_BREAKPOINT = 768;

/**
 * A custom React hook that returns true if the screen width is below the mobile breakpoint.
 * @returns {boolean} - True if the viewport is considered mobile size, otherwise false.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(undefined);

  useEffect(() => {
    // Function to check the screen size and update the state
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Run the check once on component mount
    checkScreenSize();

    // Add an event listener to re-check when the window is resized
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []); // The empty dependency array ensures this effect runs only once on mount and cleanup on unmount

  return !!isMobile;
}