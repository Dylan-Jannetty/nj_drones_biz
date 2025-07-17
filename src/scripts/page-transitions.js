// Page transition variables
let isTransitioning = false;
let cursorDroneInitialized = false;
let cursorDroneAnimationId = null;

// Drone page transition animation
function animatePageTransition(targetUrl) {
  if (isTransitioning) return;
  isTransitioning = true;

  const pageTransition = document.getElementById("page-transition");
  const mainContent = document.getElementById("main-content");

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

// Handle page load after drone transition
function handleDronePageLoad() {
  const isDroneTransition = sessionStorage.getItem("droneTransition");
  console.log("Checking for drone transition:", isDroneTransition);

  // Check if elements exist
  const pageTransition = document.getElementById("page-transition");
  const pageOverlay = document.getElementById("page-overlay");
  const pageContent = document.getElementById("page-content");
  const droneFlight = document.getElementById("drone-flight");
  const droneCable = document.getElementById("drone-cable");
  const mainContent = document.getElementById("main-content");

  console.log("Elements found:", {
    pageTransition: !!pageTransition,
    pageOverlay: !!pageOverlay,
    pageContent: !!pageContent,
    droneFlight: !!droneFlight,
    droneCable: !!droneCable,
    mainContent: !!mainContent,
  });

  // Check for drone transition first and hide content immediately
  if (isDroneTransition) {
    console.log("Drone transition flag detected");
    // Immediately hide main content and footer to prevent flash
    if (mainContent) {
      mainContent.style.opacity = "0";
      mainContent.style.transition = "none";
    }

    // Hide original footer during animation
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.opacity = "0";
      footer.style.transition = "none";
    }
  }

  if (isDroneTransition && window.location.pathname !== "/") {
    console.log("Drone transition detected! Starting page delivery animation...");
    // Clear the flag
    sessionStorage.removeItem("droneTransition");

    // Main content already hidden above to prevent flash

    // Completely hide original drone elements causing black ball
    if (droneFlight) {
      droneFlight.style.display = "none";
      droneFlight.style.visibility = "hidden";
      droneFlight.style.opacity = "0";
    }

    // Step 2: Show the transition overlay and ensure navigation stays visible
    pageTransition.style.pointerEvents = "all";
    pageTransition.style.opacity = "1";

    // Make sure navigation bar stays visible above everything
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.style.zIndex = "10010"; // Higher than all animation elements
    }

    // Step 3: Copy main content and footer to page overlay
    console.log("pageOverlay element:", pageOverlay);
    console.log("pageContent element:", pageContent);
    console.log("mainContent element:", mainContent);

    if (pageContent && mainContent) {
      const footer = document.querySelector("footer");
      pageContent.innerHTML = mainContent.innerHTML + (footer ? footer.outerHTML : "");
      pageContent.className = mainContent.className;
      console.log("Content and footer copied to page overlay");
    }

    // Step 4: Create delivery drone using original SVG
    const droneSize = Math.min(window.innerWidth, window.innerHeight) * 0.144; // Same size for both mobile and desktop
    const centerX = window.innerWidth / 2 - droneSize / 2;
    const startY = window.innerHeight + droneSize; // Start below screen
    const endY = -droneSize - 200; // Go much higher off-screen at top

    const deliveryDrone = document.createElement("div");
    deliveryDrone.id = "delivery-drone";

    // Use the original drone SVG with spinning propellers
    deliveryDrone.innerHTML = `
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));">
        <!-- Drone Body -->
        <g class="drone-body">
          <rect x="80" y="90" width="40" height="20" rx="4" fill="#1d4ed8" stroke="#1e40af" stroke-width="3"/>
          <circle cx="100" cy="105" r="8" fill="#1f2937" stroke="#111827" stroke-width="2"/>
          <circle cx="100" cy="105" r="5" fill="#000000"/>
          <rect x="60" y="95" width="25" height="4" rx="2" fill="#374151"/>
          <rect x="115" y="95" width="25" height="4" rx="2" fill="#374151"/>
          <rect x="98" y="70" width="4" height="25" rx="2" fill="#374151"/>
          <rect x="98" y="105" width="4" height="25" rx="2" fill="#374151"/>
        </g>
        
        <!-- Spinning Propellers -->
        <g class="propeller propeller-1" style="animation: spin 0.1s linear infinite; transform-origin: 70px 80px;">
          <circle cx="70" cy="80" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
          <line x1="58" y1="80" x2="82" y2="80" stroke="#60a5fa" stroke-width="2"/>
          <line x1="70" y1="68" x2="70" y2="92" stroke="#60a5fa" stroke-width="2"/>
        </g>
        
        <g class="propeller propeller-2" style="animation: spin 0.1s linear infinite; transform-origin: 130px 80px;">
          <circle cx="130" cy="80" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
          <line x1="118" y1="80" x2="142" y2="80" stroke="#60a5fa" stroke-width="2"/>
          <line x1="130" y1="68" x2="130" y2="92" stroke="#60a5fa" stroke-width="2"/>
        </g>
        
        <g class="propeller propeller-3" style="animation: spin 0.1s linear infinite; transform-origin: 70px 120px;">
          <circle cx="70" cy="120" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
          <line x1="58" y1="120" x2="82" y2="120" stroke="#60a5fa" stroke-width="2"/>
          <line x1="70" y1="108" x2="70" y2="132" stroke="#60a5fa" stroke-width="2"/>
        </g>
        
        <g class="propeller propeller-4" style="animation: spin 0.1s linear infinite; transform-origin: 130px 120px;">
          <circle cx="130" cy="120" r="15" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.6"/>
          <line x1="118" y1="120" x2="142" y2="120" stroke="#60a5fa" stroke-width="2"/>
          <line x1="130" y1="108" x2="130" y2="132" stroke="#60a5fa" stroke-width="2"/>
        </g>
        
        <!-- Landing gear -->
        <rect x="85" y="115" width="2" height="8" fill="#6b7280"/>
        <rect x="113" y="115" width="2" height="8" fill="#6b7280"/>
        <rect x="82" y="121" width="8" height="2" rx="1" fill="#6b7280"/>
        <rect x="110" y="121" width="8" height="2" rx="1" fill="#6b7280"/>
        
        <!-- LED lights -->
        <circle cx="90" cy="92" r="2" fill="#ef4444" opacity="0.8"/>
        <circle cx="110" cy="92" r="2" fill="#22c55e" opacity="0.8"/>
      </svg>
      
      <style>
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .drone-body {
          filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.4));
        }
      </style>
    `;

    deliveryDrone.style.cssText = `
      position: fixed !important;
      left: ${centerX}px !important;
      top: ${startY}px !important;
      width: ${droneSize}px !important;
      height: ${droneSize}px !important;
      z-index: 10001 !important;
      transition: none !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    `;

    document.body.appendChild(deliveryDrone);

    // Create separate shadow element that follows the drone
    const droneShadow = document.createElement("div");
    droneShadow.id = "drone-shadow";
    droneShadow.style.cssText = `
      position: fixed !important;
      left: ${centerX + droneSize * 0.02}px !important;
      top: ${startY + droneSize + 10}px !important;
      width: ${droneSize * 0.96}px !important;
      height: 18px !important;
      background: radial-gradient(ellipse, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.12) 40%, transparent 70%) !important;
      border-radius: 50% !important;
      z-index: 9999 !important;
      transition: none !important;
      transform-origin: center !important;
    `;

    document.body.appendChild(droneShadow);

    // Hide any other drone-related elements that might be causing the black ball
    const droneElements = document.querySelectorAll('[id*="drone"], [class*="drone"]');
    droneElements.forEach((el) => {
      if (
        el !== deliveryDrone &&
        el.id !== "delivery-drone" &&
        el !== droneShadow &&
        el.id !== "drone-shadow"
      ) {
        el.style.display = "none";
        el.style.visibility = "hidden";
        el.style.opacity = "0";
      }
    });

    // No cable needed - drone operates without visible cable

    // Step 5: Create completely new page overlay for sliding animation
    const slidingPage = document.createElement("div");
    slidingPage.id = "sliding-page";
    const footer = document.querySelector("footer");
    slidingPage.innerHTML = mainContent.innerHTML + (footer ? footer.outerHTML : "");
    slidingPage.className = mainContent.className;

    slidingPage.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      transform: translateY(100%) !important;
      transition: none !important;
      z-index: 9998 !important;
      overflow: auto !important;
      background: white !important;
    `;

    document.body.appendChild(slidingPage);

    // No connection point needed without cable

    // Step 7: Start staggered sliding animation
    setTimeout(() => {
      // Two-phase animation: 1) Delivery to nav bar, 2) Drone departure
      const navBarHeight = 80;
      const deliveryTiming = "2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Faster delivery to match page speed
      const departureTiming = "2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Slower departure

      console.log("Starting delivery phase...");

      // PHASE 1A: Start drone movement first
      const deliveryY = navBarHeight + 50; // Position just below nav bar for visible delivery
      deliveryDrone.style.transition = `top ${deliveryTiming}`;
      deliveryDrone.style.top = deliveryY + "px";

      // Move shadow with drone
      droneShadow.style.transition = `top ${deliveryTiming}`;
      droneShadow.style.top = deliveryY + droneSize + 10 + "px";

      // PHASE 1B: Start page sliding after a short delay
      setTimeout(() => {
        const pageStopPosition = 0; // Slide to normal position, not above nav bar
        const pageTiming = "2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"; // Faster page sliding
        slidingPage.style.transition = `transform ${pageTiming}`;
        slidingPage.style.transform = `translateY(${pageStopPosition}%)`;
      }, 300); // Page starts sliding 300ms after drone

      // PHASE 2: After delivery, drone flies off-screen
      setTimeout(() => {
        console.log("Page delivered! Drone departing...");

        // Drone flies off screen
        deliveryDrone.style.transition = `top ${departureTiming}`;
        deliveryDrone.style.top = endY + "px";

        // Move shadow with departing drone
        droneShadow.style.transition = `top ${departureTiming}, opacity ${departureTiming}`;
        droneShadow.style.top = endY + droneSize + 10 + "px";
        droneShadow.style.opacity = "0";

        // No cable to animate

        // PHASE 3: Show real content in exact same position (no animations)
        setTimeout(() => {
          console.log("Drone departed, showing real content in delivered position");

          // Position real content exactly where the sliding page was delivered
          if (mainContent) {
            mainContent.style.transition = "none"; // No transitions
            mainContent.style.transform = "none"; // Restore original proper positioning
            mainContent.style.opacity = "1";
          }

          // Restore footer visibility
          const footer = document.querySelector("footer");
          if (footer) {
            footer.style.opacity = "1";
          }

          // Restore cursor drone functionality
          setTimeout(() => {
            cursorDroneInitialized = false; // Reset flag
            if (window.initializeCursorDrone) {
              window.initializeCursorDrone();
            }
          }, 500);

          // Remove sliding page instantly after real content is positioned
          slidingPage.remove();

          // Clean up all animation elements
          setTimeout(() => {
            deliveryDrone.remove();
            droneShadow.remove();
            pageTransition.style.opacity = "0";
            pageTransition.style.pointerEvents = "none";
            resetPageTransition();

            // DO NOT reset main content positioning - keep it where drone dropped it
            // if (mainContent) {
            //   mainContent.style.transform = 'none';
            // }
          }, 100);
        }, 2100); // After slower drone departure
      }, 2600); // After faster delivery is complete
    }, 300);
  } else {
    // Normal page load or home page with drone transition flag
    if (mainContent) {
      mainContent.style.opacity = "1";
    }

    // Ensure footer is visible for normal page loads
    const footer = document.querySelector("footer");
    if (footer) {
      footer.style.opacity = "1";
    }

    // Clear drone transition flag if we're on home page
    if (isDroneTransition && window.location.pathname === "/") {
      sessionStorage.removeItem("droneTransition");
      console.log("Cleared drone transition flag for home page");
    }
  }
}

// Reset animation state
function resetPageTransition() {
  const pageTransition = document.getElementById("page-transition");
  const pageOverlay = document.getElementById("page-overlay");
  const droneFlight = document.getElementById("drone-flight");
  const droneCable = document.getElementById("drone-cable");

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
    const pageContent = document.getElementById("page-content");
    if (pageContent) {
      pageContent.innerHTML = "";
    }

    isTransitioning = false;
  }
}

// Intercept navigation clicks
function interceptNavigation() {
  const navLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const currentPath = window.location.pathname;

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

// Export functions for global use
window.handleDronePageLoad = handleDronePageLoad;
window.resetPageTransition = resetPageTransition;
window.interceptNavigation = interceptNavigation;