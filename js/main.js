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

[].forEach.call(document.querySelectorAll("img[data-src]"), function (img) {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.onload = function () {
    img.removeAttribute("data-src");
  };
});

//Переменная для включения/отключения индикатора загрузки
var spinner = $(".ymap-container").children(".loader");
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init() {
  var myMapTemp = new ymaps.Map("map-yandex", {
    center: [12.934923151175724, 100.88307986706273], // координаты центра на карте
    zoom: 15, // коэффициент приближения карты
    controls: ["zoomControl", "fullscreenControl"], // выбираем только те функции, которые необходимы при использовании
  });
  var myPlacemarkTemp = new ymaps.Placemark(
    [12.934923151175724, 100.88307986706273],
    {
      balloonContent: "Hilton Hotel",
    },
    {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: "default#imageWithContent",
      // Своё изображение иконки метки.
      iconImageHref: "img/map-marker.svg",
      // Размеры метки.
      iconImageSize: [25, 25],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-15, -25],
    }
  );
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определения полной загрузки карты
  waitForTilesLoad(layer).then(function () {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass("is-active");
  });
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer),
      readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function () {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
        layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback) {
  var script = document.createElement("script");

  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Другие браузеры
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function () {
  $(".ymap-container").mouseenter(function () {
    if (!check_if_load) {
      // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
      check_if_load = true;

      // Показываем индикатор загрузки до тех пор, пока карта не загрузится
      spinner.addClass("is-active");

      // Загружаем API Яндекс.Карт
      loadScript(
        "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1",
        function () {
          // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
          ymaps.load(init);
        }
      );
    }
  });
};

$(function () {
  //Запускаем основную функцию
  ymap();
});
