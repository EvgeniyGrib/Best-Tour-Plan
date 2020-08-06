$(document).ready(function () {
  function c() {
    event.preventDefault();
    var a = $(".modal__overlay"),
      b = $(".modal__dialog");
    a.removeClass("modal__overlay--visible");
    b.removeClass("modal__dialog--visible");
  }
  new Swiper(".hotel-slider", {
    loop: !0,
    navigation: {
      nextEl: ".hotel-slider__button--next",
      prevEl: ".hotel-slider__button--prev",
    },
    keyboard: { enabled: !0, onlyInViewport: !1 },
    effect: "coverflow",
  });
  new Swiper(".reviews-slider", {
    loop: !0,
    navigation: {
      nextEl: ".reviews-slider__button--next",
      prevEl: ".reviews-slider__button--prev",
    },
    keyboard: { enabled: !0, onlyInViewport: !1 },
  });
  document.querySelector(".menu-button").addEventListener("click", function () {
    console.log(
      "\u041a\u043b\u0438\u043a \u043f\u043e \u043a\u043d\u043e\u043f\u043a\u0435 \u043c\u0435\u043d\u044e"
    );
    document
      .querySelector(".navbar-bottom")
      .classList.toggle("navbar-bottom_visible");
  });
  var d = $("[data-toggle=modal]"),
    e = $(".modal__close");
  d.on("click", function () {
    var a = $(this).attr("data-href");
    $(a).find(".modal__overlay").addClass("modal__overlay--visible");
    $(a).find(".modal__dialog").addClass("modal__dialog--visible");
  });
  e.on("click", c);
  window.onkeydown = function () {
    "Escape" == event.key && c();
  };
  // ymaps.ready(function () {
  //   var a = new ymaps.Map("map", {
  //       center: [12.934923151175724, 100.88307986706273],
  //       zoom: 15,
  //     }),
  //     b = new ymaps.Placemark([12.934923151175724, 100.88307986706273], {
  //       hintContent: "Hilton Hotel",
  //     });
  //   a.geoObjects.add(b);
  // });
  $('[name="phone"]').on("input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[A-Za-z\u0410-\u042f\u0430-\u044f\u0401\u0451]/, "")
    );
  });
  $(".form").each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Please enter a name",
          minlength: "The name must be at least 2 letters",
        },
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com",
        },
        phone: {
          required: "Phone is required",
          minlength: "Please enter at least 10 characters.",
        },
      },
    });
  });
  $(".phone").mask("+7(999) 999-99-99");
});

$(".newsletter-parallax").parallax({ imageSrc: "./img/newsletter-bg.jpg" });
AOS.init();
AOS.init({
  disable: function () {
    return 768 > window.innerWidth;
  },
});
//Переменная для включения/отключения индикатора загрузки
var spinner = $(".ymap-container").children(".loader");
//Переменная для определения была ли хоть раз загружена rарта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function () {
  $(".ymap-container").mouseenter(function () {
    if (!check_if_load) {
      // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
      check_if_load = true;

      // Показываем индикатор загрузки до тех пор, пока карта не загрузится
      spinner.addClass("is-active");
      setTimeout(function () {
        spinner.removeClass("is-active");
      }, 1000);
      $(".ymap-container").append(
        '<iframe class="ymap-container" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15810.165995306128!2d98.29922!3d7.838252000000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa67a542329d011e1!2z0J_RhdGD0LrQtdGCLCDQmtCw0YDQvtC9LCDQntGC0LXQu9GMINCl0LjQu9GC0L7QvQ!5e0!3m2!1sru!2sru!4v1596736326031!5m2!1sru!2sru" frameborder="0" style="border: 0;" allowfullscreen="" aria-hidden="false" tabindex="0" ></iframe>'
      );
    }
  });
};

$(function () {
  //Запускаем основную функцию
  ymap();
});
