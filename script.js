document.documentElement.classList.add("js-reveal");

const revealItems = document.querySelectorAll(".rv");

const revealVisibleItems = () => {
  revealItems.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.08 && rect.bottom > -80) {
      element.classList.add("in");
    }
  });
};

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.08 }
);

revealItems.forEach(element => revealObserver.observe(element));
revealVisibleItems();
window.addEventListener("load", revealVisibleItems, { once: true });
window.addEventListener("hashchange", () => setTimeout(revealVisibleItems, 80));

const lightbox = document.getElementById("lb");
const lightboxImage = document.getElementById("lb-img");

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
}

document.querySelectorAll("[data-lightbox]").forEach(card => {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  const open = () => {
    const image = card.querySelector("img");
    if (!image) return;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || "Portfolio preview";
    lightbox.classList.add("open");
  };

  card.addEventListener("click", open);
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
});

lightbox.addEventListener("click", closeLightbox);
lightboxImage.addEventListener("click", event => event.stopPropagation());

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});
