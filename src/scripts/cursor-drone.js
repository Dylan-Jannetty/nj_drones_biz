// Cursor following drone functionality
let cursorDroneInitialized = false;
let cursorDroneAnimationId = null;

function initializeCursorDrone() {
  if (cursorDroneInitialized) return;
  
  const cursor = { x: 0, y: 0 };
  const dronePosition = { x: 0, y: 0 };
  
  // Create cursor drone element
  const cursorDrone = document.createElement("div");
  cursorDrone.id = "cursor-drone";
  cursorDrone.style.cssText = `
    position: fixed;
    width: 100px;
    height: 100px;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    will-change: transform;
  `;
  
  // Add drone SVG
  cursorDrone.innerHTML = `
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
      <!-- Drone Body -->
      <g class="cursor-drone-body">
        <rect x="80" y="90" width="40" height="20" rx="4" fill="#1d4ed8" stroke="#1e40af" stroke-width="2"/>
        <circle cx="100" cy="105" r="6" fill="#1f2937" stroke="#111827" stroke-width="1"/>
        <circle cx="100" cy="105" r="3" fill="#000000"/>
        <rect x="65" y="95" width="20" height="3" rx="1" fill="#374151"/>
        <rect x="115" y="95" width="20" height="3" rx="1" fill="#374151"/>
        <rect x="98" y="75" width="4" height="20" rx="2" fill="#374151"/>
        <rect x="98" y="105" width="4" height="20" rx="2" fill="#374151"/>
      </g>
      
      <!-- Spinning Propellers -->
      <g class="propeller" style="animation: cursorSpin 0.1s linear infinite; transform-origin: 75px 85px;">
        <circle cx="75" cy="85" r="12" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
        <line x1="66" y1="85" x2="84" y2="85" stroke="#60a5fa" stroke-width="1"/>
        <line x1="75" y1="76" x2="75" y2="94" stroke="#60a5fa" stroke-width="1"/>
      </g>
      
      <g class="propeller" style="animation: cursorSpin 0.1s linear infinite; transform-origin: 125px 85px;">
        <circle cx="125" cy="85" r="12" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
        <line x1="116" y1="85" x2="134" y2="85" stroke="#60a5fa" stroke-width="1"/>
        <line x1="125" y1="76" x2="125" y2="94" stroke="#60a5fa" stroke-width="1"/>
      </g>
      
      <g class="propeller" style="animation: cursorSpin 0.1s linear infinite; transform-origin: 75px 115px;">
        <circle cx="75" cy="115" r="12" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
        <line x1="66" y1="115" x2="84" y2="115" stroke="#60a5fa" stroke-width="1"/>
        <line x1="75" y1="106" x2="75" y2="124" stroke="#60a5fa" stroke-width="1"/>
      </g>
      
      <g class="propeller" style="animation: cursorSpin 0.1s linear infinite; transform-origin: 125px 115px;">
        <circle cx="125" cy="115" r="12" fill="none" stroke="#60a5fa" stroke-width="1" opacity="0.6"/>
        <line x1="116" y1="115" x2="134" y2="115" stroke="#60a5fa" stroke-width="1"/>
        <line x1="125" y1="106" x2="125" y2="124" stroke="#60a5fa" stroke-width="1"/>
      </g>
      
      <!-- Landing gear -->
      <rect x="90" y="115" width="1" height="6" fill="#6b7280"/>
      <rect x="109" y="115" width="1" height="6" fill="#6b7280"/>
      <rect x="88" y="120" width="5" height="1" rx="0.5" fill="#6b7280"/>
      <rect x="107" y="120" width="5" height="1" rx="0.5" fill="#6b7280"/>
      
      <!-- LED lights -->
      <circle cx="92" cy="92" r="1" fill="#ef4444" opacity="0.8"/>
      <circle cx="108" cy="92" r="1" fill="#22c55e" opacity="0.8"/>
    </svg>
  `;
  
  document.body.appendChild(cursorDrone);
  
  // Track cursor position
  document.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });
  
  // Mouse enter/leave events
  document.addEventListener("mouseenter", () => {
    cursorDrone.style.opacity = "1";
  });
  
  document.addEventListener("mouseleave", () => {
    cursorDrone.style.opacity = "0";
  });
  
  // Smooth following animation
  function animateCursorDrone() {
    const distanceX = cursor.x - dronePosition.x;
    const distanceY = cursor.y - dronePosition.y;
    
    // Easing factor for smooth following
    const easing = 0.1;
    
    // Update drone position with easing
    dronePosition.x += distanceX * easing;
    dronePosition.y += distanceY * easing;
    
    // Apply transform
    cursorDrone.style.transform = `translate(${dronePosition.x - 50}px, ${dronePosition.y - 50}px)`;
    
    cursorDroneAnimationId = requestAnimationFrame(animateCursorDrone);
  }
  
  // Start animation
  animateCursorDrone();
  cursorDroneInitialized = true;
}

// Export function for global use
window.initializeCursorDrone = initializeCursorDrone;