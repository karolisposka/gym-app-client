feather.replace();
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,

  // If we need pagination

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
      loopedSlides: 1,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      loopedSlides: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      loopedSlides: 2,
      spaceBetween: 10,
    },
    675: {
      slidesPerView: 3,
      loopedSlides: 2,
      spaceBetween: 20,
    },
  },
});
