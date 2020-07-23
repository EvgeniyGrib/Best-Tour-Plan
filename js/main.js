var hotelSlider = new Swiper(".hotel-slider", {
  // Optional parameters
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".hotel-slider__button--next",
    prevEl: ".hotel-slider__button--prev",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  effect: "coverflow",
});

var reviewsSlider = new Swiper(".reviews-slider", {
  // Optional parameters
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".reviews-slider__button--next",
    prevEl: ".reviews-slider__button--prev",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [12.934923151175724, 100.88307986706273],
    zoom: 15,
    // behaviors: [], // если при наведении крутить колесик, то карта не будет зумиться
  });

  myMap.geoObjects;

  // var placemark = new ymaps.Placemark(
  //   [12.934923151175724, 100.88307986706273],
  //   {}
  // );

  // map.geoObjects.add(placemark);
}
