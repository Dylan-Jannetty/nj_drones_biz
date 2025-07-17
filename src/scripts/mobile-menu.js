// Mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const hamburgerLines = document.querySelectorAll(".hamburger-line");
  const navLogo = document.querySelector(".nav-logo");
  let isMenuOpen = false;

  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        // Open menu
        mobileMenuOverlay.style.transform = "translateX(0)";
        mobileMenuBtn.classList.add("menu-open");

        // Animate hamburger to X
        hamburgerLines[0].style.transform = "rotate(45deg) translate(4px, 3px)";
        hamburgerLines[0].style.backgroundColor = "#000000";
        hamburgerLines[1].style.opacity = "0";
        hamburgerLines[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        hamburgerLines[2].style.backgroundColor = "#000000";

        // Change logo color to brown (stone-600)
        if (navLogo) {
          navLogo.style.transition = "color 0.3s ease";
          navLogo.style.color = "rgb(138, 116, 86)"; // stone-600 color
        }

        // Prevent body scroll
        document.body.style.overflow = "hidden";
      } else {
        // Close menu
        mobileMenuOverlay.style.transform = "translateX(100%)";
        mobileMenuBtn.classList.remove("menu-open");

        // Animate X back to hamburger
        hamburgerLines[0].style.transform = "none";
        hamburgerLines[0].style.backgroundColor = "";
        hamburgerLines[1].style.opacity = "1";
        hamburgerLines[2].style.transform = "none";
        hamburgerLines[2].style.backgroundColor = "";

        // Reset logo color
        if (navLogo) {
          navLogo.style.color = "";
        }

        // Restore body scroll
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on links
    const menuLinks = mobileMenuOverlay.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (isMenuOpen) {
          mobileMenuBtn.click(); // Trigger close
        }
      });
    });

    // Close menu on outside click
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay && isMenuOpen) {
        mobileMenuBtn.click(); // Trigger close
      }
    });
  }
}

// Export function for global use
window.initializeMobileMenu = initializeMobileMenu;