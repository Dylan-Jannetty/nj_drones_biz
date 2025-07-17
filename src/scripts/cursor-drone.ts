// Cursor following drone functionality
interface CursorPosition {
  x: number;
  y: number;
}

interface DroneState {
  initialized: boolean;
  animationId: number | null;
  position: CursorPosition;
}

let droneState: DroneState = {
  initialized: false,
  animationId: null,
  position: { x: 0, y: 0 }
};

const cursor: CursorPosition = { x: 0, y: 0 };

export function initializeCursorDrone(): void {
  if (droneState.initialized) return;
  
  const cursorDrone = document.getElementById("cursor-drone") as HTMLElement | null;
  if (!cursorDrone) return;
  
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
  
  cursorDrone.style.transform = "translate(-50%, -50%)";
  cursorDrone.style.opacity = "0";
  
  // Track cursor position
  document.addEventListener("mousemove", (e: MouseEvent) => {
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
  
  // Start animation
  animateCursorDrone(cursorDrone);
  droneState.initialized = true;
}

function animateCursorDrone(droneElement: HTMLElement): void {
  const distanceX = cursor.x - droneState.position.x;
  const distanceY = cursor.y - droneState.position.y;
  
  // Easing factor for smooth following
  const easing = 0.1;
  
  // Update drone position with easing
  droneState.position.x += distanceX * easing;
  droneState.position.y += distanceY * easing;
  
  // Apply transform
  droneElement.style.transform = `translate(${droneState.position.x - 50}px, ${droneState.position.y - 50}px)`;
  
  droneState.animationId = requestAnimationFrame(() => animateCursorDrone(droneElement));
}

export function resetCursorDrone(): void {
  if (droneState.animationId) {
    cancelAnimationFrame(droneState.animationId);
  }
  droneState.initialized = false;
  droneState.animationId = null;
  droneState.position = { x: 0, y: 0 };
}

// Initialize on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeCursorDrone();
});