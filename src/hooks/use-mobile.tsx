
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if screen is mobile width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Check immediately on mount
    checkIsMobile()
    
    // Setup media query listener for responsive changes
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern approach using addEventListener
    const handleChange = () => checkIsMobile()
    mql.addEventListener("change", handleChange)
    
    // Also listen for resize events as a fallback
    window.addEventListener("resize", checkIsMobile)
    
    // Check orientation change for mobile devices
    window.addEventListener("orientationchange", checkIsMobile)
    
    // Cleanup
    return () => {
      mql.removeEventListener("change", handleChange)
      window.removeEventListener("resize", checkIsMobile)
      window.removeEventListener("orientationchange", checkIsMobile)
    }
  }, [])

  // For SSR, default to desktop if undefined
  return isMobile === undefined ? false : isMobile
}
