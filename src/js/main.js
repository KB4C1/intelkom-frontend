document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initAccordion();
  initSearchToggle();
  initAboutSlider();
  initTrustedSlider();
});

function initBurgerMenu() {
  const menuBtn = document.querySelector("[data-menu-open]");
  const closeBtn = document.querySelector("[data-menu-close]");
  const overlay = document.querySelector("[data-menu-overlay]");
  const panel = document.querySelector("[data-menu-panel]");

  if (!menuBtn || !overlay || !panel) return;

  const open = () => {
    overlay.classList.remove("hidden");
    panel.classList.remove("hidden");
    panel.classList.add("flex");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    overlay.classList.add("hidden");
    panel.classList.add("hidden");
    panel.classList.remove("flex");
    document.body.style.overflow = "";
  };

  menuBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay.addEventListener("click", close);
}

function initAccordion() {
  const heads = document.querySelectorAll("[data-accordion-head]");

  heads.forEach((head) => {
    head.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;

      const item = head.closest("[data-accordion-item]");
      if (!item) return;

      const body = item.querySelector("[data-accordion-body]");
      if (!body) return;

      e.preventDefault();

      const arrow = item.querySelector("img");
      const isHidden = body.classList.toggle("hidden");
      const isOpened = !isHidden;

      head.classList.toggle("border-l-4", isOpened);
      head.classList.toggle("border-[#CC1A1A]", isOpened);

      arrow?.classList.toggle("rotate-0", isOpened);
      arrow?.classList.toggle("brightness-75", isOpened);
      arrow?.classList.toggle("-rotate-90", isHidden);
    });
  });
}

function initSearchToggle() {
  const openBtn = document.querySelector("[data-search-open]");
  const closeBtn = document.querySelector("[data-search-close]");
  const box = document.querySelector("[data-search-box]");
  const input = document.querySelector("[data-search-input]");
  const logoLink = document.querySelector("[data-logo-link]");
  const langToggle = document.querySelector("[data-lang-toggle]");
  const nav = document.querySelector("[data-main-nav]");
  const belowMd = window.matchMedia("(width < 768px)");

  if (!openBtn || !box) return;

  const open = () => {
    box.classList.remove("hidden");
    box.classList.add("flex");
    openBtn.classList.add("hidden");
    nav?.classList.add("xl:hidden");

    if (belowMd.matches) {
      logoLink?.classList.add("hidden");
    } else {
      logoLink?.classList.remove("hidden");
    }

    langToggle?.classList.add("hidden");
    input?.focus();
  };

  const close = () => {
    box.classList.add("hidden");
    box.classList.remove("flex");
    openBtn.classList.remove("hidden");

    nav?.classList.remove("xl:hidden");
    logoLink?.classList.remove("hidden");
    langToggle?.classList.remove("hidden");

    if (input) input.value = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
}

function initAboutSlider() {
  const slider = document.querySelector(".about-slider");

  const $slider = window.jQuery(slider);

  $slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "22%",
    arrows: true,
    dots: true,
    infinite: true,
    customPaging: function () {
      return '<div class="slider-dot mt-4"></div>';
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "15%",
        },
      },
    ],
  });
}

function initTrustedSlider() {
  const slider = document.querySelector(".trustedBy-slider");
  if (!slider) return;

  if (typeof window.jQuery === "undefined" || !window.jQuery.fn.slick) {
    console.warn("Slick carousel не підключено — перевір vendor.js");
    return;
  }

  const $slider = window.jQuery(slider);
  const $prev = window.jQuery(".trustedBy-prev");
  const $next = window.jQuery(".trustedBy-next");

  if ($slider.hasClass("slick-initialized")) {
    $slider.slick("unslick");
  }

  $slider.slick({
    rows: 3,
    slidesPerRow: 5,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    speed: 400,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesPerRow: 3,
          rows: 3,
        },
      },
    ],
  });

  $prev.on("click", () => $slider.slick("slickPrev"));
  $next.on("click", () => $slider.slick("slickNext"));
}