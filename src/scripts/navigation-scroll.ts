// Navigation scroll effects - only for home page
interface NavigationElements {
  navbar: HTMLElement | null;
  navContainer: HTMLElement | null;
  navLogo: HTMLElement | null;
  navLinks: NodeListOf<HTMLElement> | null;
  navCta: HTMLElement | null;
  navMobileBtn: HTMLElement | null;
}

interface ScrollState {
  isScrolled: boolean;
  initialized: boolean;
}

let scrollState: ScrollState = {
  isScrolled: false,
  initialized: false
};

export function initializeNavigationScroll(isHomePage: boolean): void {
  if (scrollState.initialized || !isHomePage) return;

  const elements: NavigationElements = {
    navbar: document.getElementById("navbar"),
    navContainer: document.querySelector("#navbar .container-max"),
    navLogo: document.querySelector("#navbar .nav-logo"),
    navLinks: document.querySelectorAll("#navbar .nav-link"),
    navCta: document.querySelector("#navbar .nav-cta"),
    navMobileBtn: document.querySelector("#navbar .nav-mobile-btn")
  };

  // Verify essential elements exist
  if (!elements.navbar) {
    console.warn("Navigation scroll: navbar element not found");
    return;
  }

  function updateNavbar(): void {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > window.innerHeight * 0.8; // 80% of viewport height

    if (shouldBeScrolled && !scrollState.isScrolled) {
      setScrolledState(elements);
    } else if (!shouldBeScrolled && scrollState.isScrolled) {
      setTransparentState(elements);
    }
  }

  // Initial check
  updateNavbar();
  
  // Apply responsive colors on initial load
  applyResponsiveColors(elements);

  // Listen for scroll events
  window.addEventListener("scroll", updateNavbar);
  
  // Listen for resize events to reapply responsive colors
  window.addEventListener("resize", () => applyResponsiveColors(elements));
  
  scrollState.initialized = true;
}

function setScrolledState(elements: NavigationElements): void {
  scrollState.isScrolled = true;
  
  // Update navbar background
  elements.navbar?.classList.add(
    "bg-white/95",
    "backdrop-blur-md",
    "shadow-lg"
  );
  elements.navbar?.classList.remove("bg-transparent");
  
  // Update container padding
  elements.navContainer?.classList.add("py-4");
  elements.navContainer?.classList.remove("py-6");

  // Update logo color
  elements.navLogo?.classList.add("text-primary-600");
  elements.navLogo?.classList.remove("text-white", "lg:text-white", "md:text-primary-600");

  // Update nav links
  elements.navLinks?.forEach((link) => {
    link.classList.add("text-gray-700", "hover:text-primary-600");
    link.classList.remove("text-white", "hover:text-primary-200");
  });

  // Update CTA button
  elements.navCta?.classList.add("btn-primary");
  elements.navCta?.classList.remove("btn-secondary-modern");

  // Update mobile button hamburger lines
  const hamburgerLines = elements.navMobileBtn?.querySelectorAll(".hamburger-line") as NodeListOf<HTMLElement>;
  hamburgerLines?.forEach((line) => {
    line.classList.add("bg-gray-700");
    line.classList.remove("bg-white", "lg:bg-white", "md:bg-gray-700");
  });
}

function applyResponsiveColors(elements: NavigationElements): void {
  // Check if we're on tablet or smaller screen
  const isTabletOrSmaller = window.innerWidth < 1024; // lg breakpoint is 1024px
  
  if (isTabletOrSmaller && !scrollState.isScrolled) {
    // Apply tablet/mobile colors even when transparent
    elements.navLogo?.classList.remove("text-white");
    elements.navLogo?.classList.add("text-primary-600");
    
    const hamburgerLines = elements.navMobileBtn?.querySelectorAll(".hamburger-line") as NodeListOf<HTMLElement>;
    hamburgerLines?.forEach((line) => {
      line.classList.remove("bg-white");
      line.classList.add("bg-gray-700");
    });
  } else if (!isTabletOrSmaller && !scrollState.isScrolled) {
    // Apply desktop colors when transparent
    elements.navLogo?.classList.remove("text-primary-600");
    elements.navLogo?.classList.add("text-white");
    
    const hamburgerLines = elements.navMobileBtn?.querySelectorAll(".hamburger-line") as NodeListOf<HTMLElement>;
    hamburgerLines?.forEach((line) => {
      line.classList.remove("bg-gray-700");
      line.classList.add("bg-white");
    });
  }
}

function setTransparentState(elements: NavigationElements): void {
  scrollState.isScrolled = false;
  
  // Update navbar background
  elements.navbar?.classList.remove(
    "bg-white/95",
    "backdrop-blur-md",
    "shadow-lg"
  );
  elements.navbar?.classList.add("bg-transparent");
  
  // Update container padding
  elements.navContainer?.classList.remove("py-4");
  elements.navContainer?.classList.add("py-6");

  // Update nav links
  elements.navLinks?.forEach((link) => {
    link.classList.remove(
      "text-gray-700",
      "hover:text-primary-600"
    );
    link.classList.add("text-white", "hover:text-primary-200");
  });

  // Update CTA button
  elements.navCta?.classList.remove("btn-primary");
  elements.navCta?.classList.add("btn-secondary-modern");

  // Apply responsive colors
  applyResponsiveColors(elements);
}

export function getScrollState(): ScrollState {
  return { ...scrollState };
}

export function resetNavigationScroll(): void {
  scrollState.isScrolled = false;
  scrollState.initialized = false;
}

// Make function available globally for inline script access
declare global {
  interface Window {
    initializeNavigationScroll: (isHomePage: boolean) => void;
  }
}

window.initializeNavigationScroll = initializeNavigationScroll;