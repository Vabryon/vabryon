// Intersection Observer for section animations
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => observer.observe(section));

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Header scroll effect
const header = document.querySelector(".header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  document.querySelector(".hero").style.backgroundPosition = `center ${
    scrollY * 0.5
  }px`;
});

document.addEventListener("scroll", function () {
  const sectionImage = document.querySelector(".section-image");

  const imagePosition = sectionImage.getBoundingClientRect().top;

  const screenHeight = window.innerHeight;

  // Trigger the transition when the image is in the viewport

  if (imagePosition < screenHeight * 0.75) {
    sectionImage.classList.add("visible");
  }
});

document.addEventListener("scroll", function () {
  const header = document.querySelector(".header");

  const scrollPosition = window.scrollY;

  // Add 'scrolled' class when scrolling down

  if (scrollPosition > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Header scroll functionality
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const scrollProgress = document.querySelector(".scroll-progress");

  let isScrolled = false;
  let ticking = false;

  function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Update scroll progress bar (if you want to add it)
    if (scrollProgress) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercent + "%";
    }

    // Add or remove scrolled class based on scroll position
    if (scrollTop > 50 && !isScrolled) {
      header.classList.add("scrolled");
      isScrolled = true;
    } else if (scrollTop <= 50 && isScrolled) {
      header.classList.remove("scrolled");
      isScrolled = false;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  // Listen for scroll events
  window.addEventListener("scroll", requestTick);

  // Optional: Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
