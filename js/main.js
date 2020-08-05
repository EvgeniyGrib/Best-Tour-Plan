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
  ymaps.ready(function () {
    var a = new ymaps.Map("map", {
        center: [12.934923151175724, 100.88307986706273],
        zoom: 15,
      }),
      b = new ymaps.Placemark([12.934923151175724, 100.88307986706273], {
        hintContent: "Hilton Hotel",
      });
    a.geoObjects.add(b);
  });
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

[].forEach.call(document.querySelectorAll("img[data-src]"), function (img) {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.onload = function () {
    img.removeAttribute("data-src");
  };
});
