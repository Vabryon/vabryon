// ============================================
// FORMSPREE APPROACH (Recommended)
// ============================================
async function sendEmailViaFormspree(userEmail) {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvgrjepw";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: userEmail,
        message: `New subscriber joined: ${userEmail}`
      })
    });

    if (!response.ok) {
      throw new Error("Failed to send admin notification");
    }

    return { success: true, method: "formspree" };
  } catch (error) {
    console.error("Formspree error:", error);
    throw error;
  }
}

// ============================================
// MAIN EMAIL SENDING FUNCTION
// ============================================
async function sendEmail(userEmail) {
  return sendEmailViaFormspree(userEmail);
}

// ============================================
// FORM SUBMISSION HANDLER
// ============================================
document
  .getElementById("newsletter-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const statusMsg = document.querySelector(".status-msg");
    const button = document.querySelector(".hero__button");
    const smokeContainer = document.querySelector(".smoke-container");

    const userEmail = emailInput.value.trim();

    if (!userEmail) {
      statusMsg.textContent = "PLEASE ENTER YOUR EMAIL";
      statusMsg.style.color = "#ff4444";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      statusMsg.textContent = "PLEASE ENTER A VALID EMAIL";
      statusMsg.style.color = "#ff4444";
      return;
    }

    // Visual effects
    button.classList.add("firing");

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const smoke = document.createElement("div");
        smoke.classList.add("smoke");
        smoke.style.animation = `smoke-animation 1s ease-out forwards`;
        smoke.style.animationDelay = `${i * 0.1}s`;
        smokeContainer.appendChild(smoke);

        setTimeout(() => {
          smoke.remove();
        }, 1000);
      }, i * 100);
    }

    const shell = document.createElement("div");
    shell.classList.add("shell");
    shell.style.position = "absolute";
    shell.style.right = "10px";
    shell.style.top = "50%";
    shell.style.animation = "shell-ejection 0.8s ease-out forwards";
    document.querySelector(".input-wrapper").appendChild(shell);

    setTimeout(() => {
      shell.remove();
    }, 800);

    setTimeout(() => {
      button.style.animation = "recoil 0.3s ease-out";
    }, 100);

    statusMsg.textContent = "PROCESSING...";
    statusMsg.style.color = "#ffcc00";

    try {
      const result = await sendEmail(userEmail);

      if (result.method === "formspree") {
        statusMsg.textContent = "SUBSCRIPTION SUCCESSFUL!";
        statusMsg.style.color = "#00ff00";
      }

      emailInput.value = "";
    } catch (error) {
      statusMsg.textContent = "ERROR: PLEASE TRY AGAIN";
      statusMsg.style.color = "#ff4444";
      console.error("Email sending failed:", error);
    }

    setTimeout(() => {
      button.classList.remove("firing");
      button.style.animation = "";
    }, 500);
  });

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("VABRYON Email System Initialized");
  console.log("Using Formspree for direct delivery");
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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletter-form");
  const button = document.querySelector(".hero__button");
  const smokeContainer = document.querySelector(".smoke-container");
  const statusMsg = document.querySelector(".status-msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Trigger button animations
    fireButton();

    // Show success message
    const email = document.getElementById("email").value;
    if (email) {
      statusMsg.textContent = "Thanks for joining! We'll be in touch.";
      form.reset();

      // Clear message after 3 seconds
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 3000);
    }
  });

  function fireButton() {
    // Add recoil animation to button
    button.style.animation = "recoil 0.2s ease";

    // Add firing class for bullet animation
    button.classList.add("firing");

    // Create smoke particles
    createSmoke();

    // Create shell casing
    createShell();

    // Reset animations after they complete
    setTimeout(() => {
      button.style.animation = "";
      button.classList.remove("firing");
    }, 500);
  }

  function createSmoke() {
    // Create multiple smoke particles
    for (let i = 0; i < 6; i++) {
      const smoke = document.createElement("div");
      smoke.classList.add("smoke");

      // Random position variations
      const xOffset = Math.random() * 5;
      const yOffset = Math.random() * 10 - 5;
      const delay = Math.random() * 100;
      const duration = 500 + Math.random() * 300;

      smoke.style.left = xOffset + "px";
      smoke.style.top = yOffset + "px";
      smoke.style.animation = `smoke-animation ${duration}ms ease ${delay}ms forwards`;

      smokeContainer.appendChild(smoke);

      // Remove smoke particles after animation
      setTimeout(() => {
        smoke.remove();
      }, duration + delay + 100);
    }
  }

  function createShell() {
    const shell = document.createElement("div");
    shell.classList.add("shell");

    shell.style.top = "0px";
    shell.style.right = "10px";
    shell.style.animation = "shell-ejection 0.6s ease forwards";

    button.appendChild(shell);

    // Remove shell after animation
    setTimeout(() => {
      shell.remove();
    }, 700);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("animate");
          observer.unobserve(aboutSection); // remove if you only want it to animate once
        }
      });
    },
    { threshold: 0.1 } // adjust trigger sensitivity
  );

  observer.observe(aboutSection);
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
