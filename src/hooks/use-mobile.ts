import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the current device is mobile
 * @param breakpoint The width in pixels below which a device is considered mobile (default: 768)
 * @returns Boolean indicating if the current device is mobile
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') return;

    // Initial check
    setIsMobile(window.innerWidth < breakpoint);

    // Handler for window resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
} 