// Mobile menu functionality
interface MobileMenuState {
  isOpen: boolean;
  initialized: boolean;
}

let menuState: MobileMenuState = {
  isOpen: false,
  initialized: false
};

export function initializeMobileMenu(): void {
  if (menuState.initialized) return;
  
  const mobileMenuBtn = document.getElementById("mobile-menu-btn") as HTMLButtonElement | null;
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay") as HTMLElement | null;
  const hamburgerLines = document.querySelectorAll(".hamburger-line") as NodeListOf<HTMLElement>;
  const navLogo = document.querySelector(".nav-logo") as HTMLElement | null;

  if (!mobileMenuBtn || !mobileMenuOverlay) {
    console.warn("Mobile menu elements not found");
    return;
  }

  mobileMenuBtn.addEventListener("click", () => {
    menuState.isOpen = !menuState.isOpen;

    if (menuState.isOpen) {
      openMenu(mobileMenuOverlay, hamburgerLines, navLogo);
    } else {
      closeMenu(mobileMenuOverlay, hamburgerLines, navLogo);
    }
  });

  // Close menu when clicking on links
  const menuLinks = mobileMenuOverlay.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuState.isOpen) {
        mobileMenuBtn.click(); // Trigger close
      }
    });
  });

  // Close menu on outside click
  mobileMenuOverlay.addEventListener("click", (e: MouseEvent) => {
    if (e.target === mobileMenuOverlay && menuState.isOpen) {
      mobileMenuBtn.click(); // Trigger close
    }
  });

  menuState.initialized = true;
}

function openMenu(
  overlay: HTMLElement, 
  hamburgerLines: NodeListOf<HTMLElement>, 
  navLogo: HTMLElement | null
): void {
  // Open menu
  overlay.style.transform = "translateX(0)";
  const menuBtn = document.getElementById("mobile-menu-btn");
  menuBtn?.classList.add("menu-open");
  
  // Change navbar to solid white background
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.style.backgroundColor = "rgb(255, 255, 255)";
    navbar.style.backdropFilter = "none";
  }

  // Animate hamburger to X
  if (hamburgerLines.length >= 3) {
    hamburgerLines[0].style.transform = "rotate(45deg) translate(4px, 3px)";
    hamburgerLines[0].style.backgroundColor = "#000000";
    hamburgerLines[1].style.opacity = "0";
    hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    hamburgerLines[2].style.backgroundColor = "#000000";
  }

  // Change logo color to brown (stone-600)
  if (navLogo) {
    navLogo.style.transition = "color 0.3s ease";
    navLogo.style.color = "rgb(138, 116, 86)"; // stone-600 color
  }

  // Prevent body scroll
  document.body.style.overflow = "hidden";
}

function closeMenu(
  overlay: HTMLElement, 
  hamburgerLines: NodeListOf<HTMLElement>, 
  navLogo: HTMLElement | null
): void {
  // Close menu
  overlay.style.transform = "translateX(100%)";
  const menuBtn = document.getElementById("mobile-menu-btn");
  menuBtn?.classList.remove("menu-open");
  
  // Restore navbar to blurred transparent background
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.style.backgroundColor = "";
    navbar.style.backdropFilter = "";
  }

  // Animate X back to hamburger
  if (hamburgerLines.length >= 3) {
    hamburgerLines[0].style.transform = "none";
    hamburgerLines[0].style.backgroundColor = "";
    hamburgerLines[1].style.opacity = "1";
    hamburgerLines[2].style.transform = "none";
    hamburgerLines[2].style.backgroundColor = "";
  }

  // Reset logo color
  if (navLogo) {
    navLogo.style.color = "";
  }

  // Restore body scroll
  document.body.style.overflow = "";
}

export function closeMobileMenu(): void {
  if (menuState.isOpen) {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn") as HTMLButtonElement | null;
    if (mobileMenuBtn) {
      mobileMenuBtn.click();
    }
  }
}

export function getMobileMenuState(): MobileMenuState {
  return { ...menuState };
}

// Initialize on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeMobileMenu();
});