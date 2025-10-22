document.addEventListener("DOMContentLoaded", () => {
  const topNav = document.querySelector(".top-nav");
  const bottomNav = document.querySelector(".bottom-nav-container");
  const links = document.querySelectorAll(".navbar-nav .nav-link");
  let lastScrollTop = 0;

  const currentPage = window.location.pathname.split("/").pop();
  const isHome = currentPage === "" || currentPage === "index.html";

  // ✅ Non-home pages start with background
  if (!isHome) {
    bottomNav.classList.add("page-loaded");
  }

  // Scroll behavior
  window.addEventListener("scroll", () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 50) {
      // scrolling down
      topNav.style.transform = "translateY(-100%)";
      bottomNav.classList.remove("page-loaded");
      bottomNav.classList.add("scrolled");
    } else {
      // scrolling up
      topNav.style.transform = "translateY(0)";
      bottomNav.classList.add("scrolled");

      if (currentScroll <= 0) {
        if (isHome) {
          // Homepage → transparent reset
          bottomNav.classList.remove("scrolled");
        } else {
          // Other pages → restore background below top-nav
          bottomNav.classList.remove("scrolled");
          bottomNav.classList.add("page-loaded");
        }
      }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Active link logic
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href.includes(currentPage) && currentPage !== "") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (currentPage.includes("services")) {
    document.querySelectorAll('a[href*="services.html"]').forEach(link => {
      link.classList.add("active");
    });
  }
});
