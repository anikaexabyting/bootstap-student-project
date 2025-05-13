const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  if (
    link.getAttribute("href") === currentPage ||
    (currentPage === "" && link.getAttribute("href") === "index.html")
  ) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});
