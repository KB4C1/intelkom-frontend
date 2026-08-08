import { CountUp } from "countup.js";
import { z } from "zod";

document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
  initAccordion();
  initSearchToggle();
  initAboutSlider();
  initTPASlider();
  initTrustedSlider();
  customVideo();
  initContactForms();
  initTimeLine();
  initCounters();
});

const contactSchema = z.object({
  name: z.string().min(2, { message: "ім'я має містити щонайменше 2 букви" }),
  phone: z.string().regex(/^(\+?380|0)\d{9}$/, {
    message: "невірний формат номеру",
  }),
  email: z.string().email({ message: "невірний формат пошти" }),
  message: z
    .string()
    .min(5, { message: "повідомлення має містити не менше 5 символів" }),
});

// async function contactUs(data) {
//   try {
//     const response = await fetch('/api/contact', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

function initContactForms() {
  const forms = document.querySelectorAll(
    "#contact-form-mobile, #contact-form-desktop, .js-contact-form",
  );

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const errorSpans = form.querySelectorAll(".js-error");
      errorSpans.forEach((span) => {
        span.textContent = "";
        span.classList.add("hidden");
      });

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const result = contactSchema.safeParse(data);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0];
          const input = form.querySelector(`[name="${fieldName}"]`);

          if (input) {
            const errorSpan = input.parentElement.querySelector(".js-error");
            if (errorSpan) {
              errorSpan.textContent = issue.message;
              errorSpan.classList.remove("hidden");
            }
          }
        });
      } else {
        await contactUs(result.data);
        form.reset();
      }
    });
  });
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
  document.addEventListener("click", (e) => {
    const head = e.target.closest("[data-accordion-head]");
    if (!head) return;

    const link = e.target.closest("a");
    if (link && head.contains(link)) {
      return;
    }

    const item = head.closest("[data-accordion-item]");
    const body = item.querySelector("[data-accordion-body]");
    if (!body) return;

    e.preventDefault();

    const arrow = head.querySelector("img");
    const isHidden = body.classList.toggle("hidden");
    const isOpened = !isHidden;

    head.classList.toggle("border-l-[#CC1A1A]", isOpened);
    head.classList.toggle("bg-[#F2F2F7]", isOpened);
    head.classList.toggle("border-l-transparent", !isOpened);

    if (arrow) {
      arrow.classList.toggle("rotate-0", isOpened);
      arrow.classList.toggle("-rotate-90", isHidden);
    }
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
  const menuOpen = document.querySelector("[data-menu-open]");
  const belowMd = window.matchMedia("(width < 768px)");

  if (!openBtn || !box) return;

  const open = () => {
    box.classList.remove("hidden");
    box.classList.add("flex");
    openBtn.classList.add("hidden");
    nav?.classList.add("hidden");
    menuOpen?.classList.add("hidden");

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
    menuOpen?.classList.remove("hidden");

    if (input) input.value = "";
  };

  openBtn.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
}

function initAboutSlider() {
  const slider = document.querySelector(".about-slider");
  if (!slider) return;

  new Swiper(slider, {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    speed: 500,
    pagination: {
      el: document.querySelector(".about-pagination"),
      clickable: true,
    },
  });
}

function initTPASlider() {
  const slider = document.querySelector(".tpa-slider");
  if (!slider) return;

  new Swiper(slider, {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 16,
    loop: true,
    speed: 500,
    pagination: {
      el: document.querySelector(".tpa-pagination"),
      clickable: true,
    },
  });
}

function initTrustedSlider() {
  const container = document.querySelector("[data-trusted-slider]");
  if (!container) return;

  const prevBtn = document.querySelector("[data-trusted-prev]");
  const nextBtn = document.querySelector("[data-trusted-next]");

  new Swiper(container, {
    slidesPerView: 1,
    loop: true,
    speed: 500,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
  });
}

function customVideo() {
  const wrappers = document.querySelectorAll("[data-video-wrapper]");

  wrappers.forEach((wrapper) => {
    const video = wrapper.querySelector("[data-video-player]");
    const playBtn = wrapper.querySelector("[data-video-play]");

    if (!video || !playBtn) return;

    playBtn.addEventListener("click", () => {
      video.play();
    });

    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", () => {
      playBtn.classList.add("hidden");
    });

    video.addEventListener("pause", () => {
      playBtn.classList.remove("hidden");
    });

    video.addEventListener("ended", () => {
      playBtn.classList.remove("hidden");
    });
  });
}

function initTimeLine() {
  const container = document.getElementById("timeline-container");
  const progressLine = document.getElementById("timeline-progress");
  const circles = [...document.querySelectorAll(".timeline-circle")];

  if (!container || !progressLine || !circles.length) return;

  const INITIAL_PROGRESS = 0.05;
  const MAX_PROGRESS = 1;

  let ticking = false;
  let listening = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function updateTimeline() {
    const containerRect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const startScroll = container.offsetTop - viewportHeight * 0.4;
    const endScroll =
      container.offsetTop + container.offsetHeight - viewportHeight * 0.7;

    const normalized = clamp(
      (window.scrollY - startScroll) / (endScroll - startScroll),
      0,
      1,
    );

    const progress =
      INITIAL_PROGRESS + normalized * (MAX_PROGRESS - INITIAL_PROGRESS);

    progressLine.style.height = `${progress * 100}%`;

    const lineBottom = containerRect.top + container.offsetHeight * progress;

    circles.forEach((circle) => {
      const rect = circle.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      circle.dataset.active = lineBottom >= center ? "true" : "false";
    });

    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateTimeline);
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!listening) {
          window.addEventListener("scroll", onScroll, {
            passive: true,
          });
          window.addEventListener("resize", updateTimeline);
          listening = true;
        }
        updateTimeline();
      } else if (listening) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updateTimeline);
        listening = false;
      }
    },
    {
      threshold: 0,
    },
  );

  observer.observe(container);
}

function initCounters() {
  const options = {
    duration: 2,
  };

  const counterArea = new CountUp("counter-area__count", 35, options);
  const counterYears = new CountUp("counter-years__count", 30, options);

  if (!counterArea.error && !counterYears.error) {
    counterArea.start();
    counterYears.start();
  } else {
    console.error(counterArea.error, counterYears.error);
  }
}
