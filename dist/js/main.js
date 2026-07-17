document.addEventListener("DOMContentLoaded", () => {
  safeInit(initBurgerMenu);
  safeInit(initAccordion);
  safeInit(initSearchToggle);
  safeInit(initAboutSlider);
  safeInit(initTPASlider);
});

function safeInit(fn) {
  try {
    fn();
  } catch (err) {
    console.error(`помлка ${fn.name}:`, err);
  }
}

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
      const item = head.closest("[data-accordion-item]");
      const body = item.querySelector("[data-accordion-body]");
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

function initTPASlider() {
  const slider = document.querySelector(".tpa-slider");
  if (!slider) return;

  const $slider = window.jQuery(slider);

  if ($slider.hasClass("slick-initialized")) return;

  if (slider.children.length === 0) {
    console.warn("initTPASlider: контейнер .tpa-slider порожній, ініціалізацію пропущено");
    return;
  }

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