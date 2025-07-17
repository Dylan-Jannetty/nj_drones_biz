// Page transition functionality
interface TransitionState {
  isTransitioning: boolean;
  cursorDroneInitialized: boolean;
  cursorDroneAnimationId: number | null;
}

let transitionState: TransitionState = {
  isTransitioning: false,
  cursorDroneInitialized: false,
  cursorDroneAnimationId: null
};

export function animatePageTransition(targetUrl: string): void {
  if (transitionState.isTransitioning) return;
  transitionState.isTransitioning = true;

  const pageTransition = document.getElementById("page-transition") as HTMLElement | null;
  const mainContent = document.getElementById("main-content") as HTMLElement | null;

  if (!pageTransition) {
    console.warn("Page transition element not found");
    window.location.href = targetUrl;
    return;
  }

  // Step 1: Smoothly fade out current page with better easing
  if (mainContent) {
    mainContent.style.transition = "opacity 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)";
    mainContent.style.opacity = "0.2";
  }

  // Step 2: Show white background after smoother delay
  setTimeout(() => {
    pageTransition.style.transition = "opacity 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)";
    pageTransition.style.pointerEvents = "all";
    pageTransition.style.opacity = "1";

    // Step 3: Navigate to the new page with flag after showing white background
    setTimeout(() => {
      sessionStorage.setItem("droneTransition", "true");
      window.location.href = targetUrl;
    }, 250);
  }, 400);
}

export function handleDronePageLoad(): void {
  const isDroneTransition = sessionStorage.getItem("droneTransition");
  console.log("Checking for drone transition:", isDroneTransition);

  // Check if elements exist
  const pageTransition = document.getElementById("page-transition") as HTMLElement | null;
  const mainContent = document.getElementById("main-content") as HTMLElement | null;

  console.log("Elements found:", {
    pageTransition: !!pageTransition,
    mainContent: !!mainContent,
  });

  // Content is already hidden by preemptive script in head
  if (isDroneTransition) {
    console.log("Drone transition flag detected - content already hidden");
  }

  if (isDroneTransition && window.location.pathname !== "/" && pageTransition && mainContent) {
    console.log("Drone transition detected! Starting simple drone animation...");
    // Clear the flag
    sessionStorage.removeItem("droneTransition");
    
    console.log("Creating drone element...");
    
    // Simple drone animation without content manipulation
    const droneSize = Math.min(window.innerWidth, window.innerHeight) * 0.12;
    const centerX = window.innerWidth / 2 - droneSize / 2;
    const startY = window.innerHeight + droneSize;
    const endY = -droneSize - 100;
    
    // Create simple drone element
    const simpleDrone = createDroneElement(centerX, startY, droneSize);
    document.body.appendChild(simpleDrone);
    
    // Add shadow to drone
    const droneShadow = createDroneShadow(centerX, startY, droneSize);
    document.body.appendChild(droneShadow);
    
    console.log("Drone element and shadow added to page");
    
    // Create the sliding effect by transforming the main content and footer
    const slidingContent = createSlidingContent(mainContent);
    document.body.appendChild(slidingContent);
    
    // Ensure navigation bar stays visible during animation
    const navbar = document.getElementById("navbar") as HTMLElement | null;
    if (navbar) {
      navbar.style.zIndex = "10010";
    }
    
    console.log("Sliding content created with cloned content and footer");
    
    // Start the animation sequence
    startDroneAnimation(simpleDrone, droneShadow, slidingContent, pageTransition, mainContent, endY, droneSize);
    
    return; // Skip the complex animation
  } else {
    // Normal page load or home page with drone transition flag
    // Ensure content is visible for normal page loads
    document.documentElement.style.setProperty('--main-opacity', '1');
    document.documentElement.style.setProperty('--footer-display', 'block');

    // Clear drone transition flag if we're on home page
    if (isDroneTransition && window.location.pathname === "/") {
      sessionStorage.removeItem("droneTransition");
      console.log("Cleared drone transition flag for home page");
    }
  }
}

function createDroneElement(centerX: number, startY: number, droneSize: number): HTMLElement {
  const simpleDrone = document.createElement("div");
  simpleDrone.innerHTML = `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <g class="drone-body">
        <rect x="80" y="90" width="40" height="20" rx="4" fill="#1d4ed8" stroke="#1e40af" stroke-width="3"/>
        <circle cx="100" cy="105" r="8" fill="#1f2937"/>
        <circle cx="100" cy="105" r="5" fill="#000000"/>
      </g>
      <g class="propeller" style="animation: spin 0.1s linear infinite; transform-origin: 70px 80px;">
        <circle cx="70" cy="80" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
        <line x1="58" y1="80" x2="82" y2="80" stroke="#60a5fa" stroke-width="2"/>
        <line x1="70" y1="68" x2="70" y2="92" stroke="#60a5fa" stroke-width="2"/>
      </g>
      <g class="propeller" style="animation: spin 0.1s linear infinite; transform-origin: 130px 80px;">
        <circle cx="130" cy="80" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
        <line x1="118" y1="80" x2="142" y2="80" stroke="#60a5fa" stroke-width="2"/>
        <line x1="130" y1="68" x2="130" y2="92" stroke="#60a5fa" stroke-width="2"/>
      </g>
      <g class="propeller" style="animation: spin 0.1s linear infinite; transform-origin: 70px 120px;">
        <circle cx="70" cy="120" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
        <line x1="58" y1="120" x2="82" y2="120" stroke="#60a5fa" stroke-width="2"/>
        <line x1="70" y1="108" x2="70" y2="132" stroke="#60a5fa" stroke-width="2"/>
      </g>
      <g class="propeller" style="animation: spin 0.1s linear infinite; transform-origin: 130px 120px;">
        <circle cx="130" cy="120" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
        <line x1="118" y1="120" x2="142" y2="120" stroke="#60a5fa" stroke-width="2"/>
        <line x1="130" y1="108" x2="130" y2="132" stroke="#60a5fa" stroke-width="2"/>
      </g>
    </svg>
    <style>
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  `;
  
  simpleDrone.style.cssText = `
    position: fixed;
    left: ${centerX}px;
    top: ${startY}px;
    width: ${droneSize}px;
    height: ${droneSize}px;
    z-index: 10020;
    pointer-events: none;
  `;
  
  return simpleDrone;
}

function createDroneShadow(centerX: number, startY: number, droneSize: number): HTMLElement {
  const droneShadow = document.createElement("div");
  droneShadow.style.cssText = `
    position: fixed;
    left: ${centerX + droneSize * 0.02}px;
    top: ${startY + droneSize + 10}px;
    width: ${droneSize * 0.96}px;
    height: 18px;
    background: radial-gradient(ellipse, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.12) 40%, transparent 70%);
    border-radius: 50%;
    z-index: 10019;
    pointer-events: none;
  `;
  return droneShadow;
}

function createSlidingContent(mainContent: HTMLElement): HTMLElement {
  const slidingContent = document.createElement("div");
  slidingContent.id = "sliding-content";
  slidingContent.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: white;
    z-index: 9998;
    transform: translateY(100%);
    overflow: auto;
  `;
  
  // Copy the actual content (not innerHTML to avoid losing event listeners)
  const contentClone = mainContent.cloneNode(true) as HTMLElement;
  const footerClone = document.querySelector("footer")?.cloneNode(true) as HTMLElement | undefined;
  
  // Make sure the cloned content is visible
  contentClone.style.opacity = "1";
  if (footerClone) {
    footerClone.style.display = "block";
  }
  
  slidingContent.appendChild(contentClone);
  if (footerClone) {
    slidingContent.appendChild(footerClone);
  }
  
  return slidingContent;
}

function startDroneAnimation(
  drone: HTMLElement,
  shadow: HTMLElement,
  slidingContent: HTMLElement,
  pageTransition: HTMLElement,
  mainContent: HTMLElement,
  endY: number,
  droneSize: number
): void {
  // Animation: drone and page slide up together
  setTimeout(() => {
    console.log("Starting drone and page slide animation...");
    
    // Drone flies up to position above the sliding page
    const droneDeliveryY = -droneSize - 50; // Position above the sliding page
    drone.style.transition = "top 2.5s ease-in-out";
    drone.style.top = droneDeliveryY + "px";
    
    // Shadow follows drone
    shadow.style.transition = "top 2.5s ease-in-out";
    shadow.style.top = droneDeliveryY + droneSize + 10 + "px";
    
    // Page slides up shortly after drone starts
    setTimeout(() => {
      console.log("Starting page slide up...");
      slidingContent.style.transition = "transform 2s ease-in-out";
      slidingContent.style.transform = "translateY(0)";
    }, 300);
    
    // After delivery, drone continues up and disappears
    setTimeout(() => {
      console.log("Drone departing...");
      drone.style.transition = "top 1.5s ease-in-out";
      drone.style.top = endY + "px";
      
      // Shadow follows departing drone and fades out
      shadow.style.transition = "top 1.5s ease-in-out, opacity 1.5s ease-in-out";
      shadow.style.top = endY + droneSize + 10 + "px";
      shadow.style.opacity = "0";
      
      // Replace the original content with the sliding content
      setTimeout(() => {
        finalizePage(slidingContent, pageTransition, mainContent, drone, shadow);
      }, 1000);
    }, 2800);
  }, 500);
}

function finalizePage(
  slidingContent: HTMLElement,
  pageTransition: HTMLElement,
  mainContent: HTMLElement,
  drone: HTMLElement,
  shadow: HTMLElement
): void {
  console.log("Finalizing page...");
  
  // Show original content and footer by resetting CSS variables
  document.documentElement.style.setProperty('--main-opacity', '1');
  document.documentElement.style.setProperty('--footer-display', 'block');
  
  // Remove sliding content and transition overlay
  slidingContent.remove();
  pageTransition.style.opacity = "0";
  pageTransition.style.pointerEvents = "none";
  
  // Clean up drone and shadow
  setTimeout(() => {
    console.log("Cleaning up drone...");
    drone.remove();
    shadow.remove();
    
    // Initialize cursor drone after cleanup
    setTimeout(() => {
      transitionState.cursorDroneInitialized = false;
      // Import and initialize cursor drone
      import('./cursor-drone.ts').then(module => {
        module.initializeCursorDrone();
      }).catch(err => {
        console.warn("Could not initialize cursor drone:", err);
      });
    }, 500);
  }, 1500);
}

export function resetPageTransition(): void {
  const pageTransition = document.getElementById("page-transition") as HTMLElement | null;
  const pageOverlay = document.getElementById("page-overlay") as HTMLElement | null;
  const droneFlight = document.getElementById("drone-flight") as HTMLElement | null;
  const droneCable = document.getElementById("drone-cable") as HTMLElement | null;

  if (pageTransition && pageOverlay && droneFlight) {
    pageTransition.style.opacity = "0";
    pageTransition.style.pointerEvents = "none";

    // Reset drone position (hidden)
    droneFlight.style.transition = "none";
    droneFlight.style.transform = "translateX(-50%) translateY(100vh)";
    droneFlight.style.opacity = "0";

    // Reset cable
    if (droneCable) {
      droneCable.style.height = "0";
      droneCable.style.transition = "none";
    }

    // Reset page overlay
    pageOverlay.style.transition = "none";
    pageOverlay.style.transform = "translateY(100%)";

    // Clear page content
    const pageContent = document.getElementById("page-content") as HTMLElement | null;
    if (pageContent) {
      pageContent.innerHTML = "";
    }

    transitionState.isTransitioning = false;
  }
}

export function interceptNavigation(): void {
  const navLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]') as NodeListOf<HTMLAnchorElement>;

  navLinks.forEach((link) => {
    link.addEventListener("click", (e: MouseEvent) => {
      const href = link.getAttribute("href");
      const currentPath = window.location.pathname;

      if (!href) return;

      // Skip if it's the same page or external link
      if (
        href === currentPath ||
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel")
      ) {
        return;
      }

      // Skip if it's a hash link on the same page
      if (href.startsWith("#")) {
        return;
      }

      // Skip drone animation if navigating to home page
      if (href === "/" || href === "/index.html") {
        return; // Let normal navigation happen without drone animation
      }

      e.preventDefault();
      animatePageTransition(href);
    });
  });
}

// Initialize on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  handleDronePageLoad();
  resetPageTransition();
  interceptNavigation();
});