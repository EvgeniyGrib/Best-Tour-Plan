$(document).ready(function () {
  // ======== SWIPER ==============
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

  // ============= mobile menu =================

  var menuButton = document.querySelector(".menu-button");
  menuButton.addEventListener("click", function () {
    console.log("Клик по кнопке меню");
    document
      .querySelector(".navbar-bottom")
      .classList.toggle("navbar-bottom_visible");
  });

  // ================== MODAL ==========================

  var modalButton = $("[data-toggle=modal]");
  var closeModalButton = $(".modal__close");
  modalButton.on("click", openModal);
  closeModalButton.on("click", closeModal);

  function openModal() {
    var targetModal = $(this).attr("data-href");
    $(targetModal).find(".modal__overlay").addClass("modal__overlay--visible");
    $(targetModal).find(".modal__dialog").addClass("modal__dialog--visible");
  }
  function closeModal() {
    event.preventDefault(); // чтобы не перебрасывало наверх страницы. нужно указывать ивент в ценкции и тут
    var modalOverlay = $(".modal__overlay");
    var modalDialog = $(".modal__dialog");
    modalOverlay.removeClass("modal__overlay--visible");
    modalDialog.removeClass("modal__dialog--visible");
  }

  window.onkeydown = () => {
    if (event.key == "Escape") {
      closeModal();
    }
  };
  // ========= MAP ==================
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [12.934923151175724, 100.88307986706273],
      zoom: 15,
      // behaviors: [], // если при наведении крутить колесик, то карта не будет зумиться
    });
    // Метка ------------------
    var placemark = new ymaps.Placemark(
      [12.934923151175724, 100.88307986706273],
      {
        hintContent: "Hilton Hotel", // при наведении всплывает подсказка
      }
    );
    myMap.geoObjects.add(placemark);
  }
  // Обработка форм
  $(".form").each(function () {
    $(this).validate({
      errorClass: "invalid",
      messages: {
        name: {
          required: "Укажите имя",
          minlength: "Имя должно быть не короче 2-х букв",
        },
        email: {
          required: "We need your email address to contact you",
          email: "Your email address must be in the format of name@domain.com",
        },
        phone: {
          required: "Телефон обязателен",
        },
      },
    });
  });
  // ============== Маски ==================
  $(".phone").mask("+7(999) 999-99-99");
});

// ======== PARALAX ===================

$(".newsletter-parallax").parallax({ imageSrc: "./img/newsletter-bg.jpg" });
