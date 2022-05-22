feather.replace();
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  preventClicks: false,
  preventClicksPropagation: false,
  simulateTouch: false,

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
      loopedSlides: 2,
      spaceBetween: 5,
    },
    1024: {
      slidesPerView: 2,
      loopedSlides: 2,
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 1,
      loopedSlides: 1,
      spaceBetween: 10,
    },
    675: {
      slidesPerView: 1,
      loopedSlides: 1,
      spaceBetween: 20,
    },
  },
});
