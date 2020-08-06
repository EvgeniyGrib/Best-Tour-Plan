/*
 parallax.js v1.5.0 (http://pixelcog.github.io/parallax.js/)
 @copyright 2016 PixelCog, Inc.
 @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
*/
(function (f, g, n, p) {
  function c(a, b) {
    var e = this;
    "object" == typeof b &&
      (delete b.refresh, delete b.render, f.extend(this, b));
    this.$element = f(a);
    !this.imageSrc &&
      this.$element.is("img") &&
      (this.imageSrc = this.$element.attr("src"));
    var d = (this.position + "").toLowerCase().match(/\S+/g) || [];
    1 > d.length && d.push("center");
    1 == d.length && d.push(d[0]);
    if ("top" == d[0] || "bottom" == d[0] || "left" == d[1] || "right" == d[1])
      d = [d[1], d[0]];
    this.positionX !== p && (d[0] = this.positionX.toLowerCase());
    this.positionY !== p && (d[1] = this.positionY.toLowerCase());
    e.positionX = d[0];
    e.positionY = d[1];
    "left" != this.positionX &&
      "right" != this.positionX &&
      (isNaN(parseInt(this.positionX))
        ? (this.positionX = "center")
        : (this.positionX = parseInt(this.positionX)));
    "top" != this.positionY &&
      "bottom" != this.positionY &&
      (isNaN(parseInt(this.positionY))
        ? (this.positionY = "center")
        : (this.positionY = parseInt(this.positionY)));
    this.position =
      this.positionX +
      (isNaN(this.positionX) ? "" : "px") +
      " " +
      this.positionY +
      (isNaN(this.positionY) ? "" : "px");
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/))
      return (
        this.imageSrc &&
          this.iosFix &&
          !this.$element.is("img") &&
          this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position,
          }),
        this
      );
    if (navigator.userAgent.match(/(Android)/))
      return (
        this.imageSrc &&
          this.androidFix &&
          !this.$element.is("img") &&
          this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position,
          }),
        this
      );
    this.$mirror = f("<div />").prependTo(this.mirrorContainer);
    d = this.$element.find(">.parallax-slider");
    var h = !1;
    0 == d.length
      ? (this.$slider = f("<img />").prependTo(this.$mirror))
      : ((this.$slider = d.prependTo(this.$mirror)), (h = !0));
    this.$mirror.addClass("parallax-mirror").css({
      visibility: "hidden",
      zIndex: this.zIndex,
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden",
    });
    this.$slider.addClass("parallax-slider").one("load", function () {
      (e.naturalHeight && e.naturalWidth) ||
        ((e.naturalHeight = this.naturalHeight || this.height || 1),
        (e.naturalWidth = this.naturalWidth || this.width || 1));
      e.aspectRatio = e.naturalWidth / e.naturalHeight;
      c.isSetup || c.setup();
      c.sliders.push(e);
      c.isFresh = !1;
      c.requestRender();
    });
    h || (this.$slider[0].src = this.imageSrc);
    ((this.naturalHeight && this.naturalWidth) ||
      this.$slider[0].complete ||
      0 < d.length) &&
      this.$slider.trigger("load");
  }
  (function () {
    for (
      var a = 0, b = ["ms", "moz", "webkit", "o"], e = 0;
      e < b.length && !g.requestAnimationFrame;
      ++e
    )
      (g.requestAnimationFrame = g[b[e] + "RequestAnimationFrame"]),
        (g.cancelAnimationFrame =
          g[b[e] + "CancelAnimationFrame"] ||
          g[b[e] + "CancelRequestAnimationFrame"]);
    g.requestAnimationFrame ||
      (g.requestAnimationFrame = function (d) {
        var h = new Date().getTime(),
          k = Math.max(0, 16 - (h - a)),
          l = g.setTimeout(function () {
            d(h + k);
          }, k);
        a = h + k;
        return l;
      });
    g.cancelAnimationFrame ||
      (g.cancelAnimationFrame = function (d) {
        clearTimeout(d);
      });
  })();
  f.extend(c.prototype, {
    speed: 0.2,
    bleed: 0,
    zIndex: -100,
    iosFix: !0,
    androidFix: !0,
    position: "center",
    overScrollFix: !1,
    mirrorContainer: "body",
    refresh: function () {
      this.boxWidth = this.$element.outerWidth();
      this.boxHeight = this.$element.outerHeight() + 2 * this.bleed;
      this.boxOffsetTop = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
      var a = c.winHeight,
        b = Math.min(this.boxOffsetTop, c.docHeight - a);
      a =
        (this.boxHeight +
          (b - Math.max(this.boxOffsetTop + this.boxHeight - a, 0)) *
            (1 - this.speed)) |
        0;
      b = ((this.boxOffsetTop - b) * (1 - this.speed)) | 0;
      a * this.aspectRatio >= this.boxWidth
        ? ((this.imageWidth = (a * this.aspectRatio) | 0),
          (this.imageHeight = a),
          (this.offsetBaseTop = b),
          (a = this.imageWidth - this.boxWidth),
          "left" == this.positionX
            ? (this.offsetLeft = 0)
            : "right" == this.positionX
            ? (this.offsetLeft = -a)
            : isNaN(this.positionX)
            ? (this.offsetLeft = (-a / 2) | 0)
            : (this.offsetLeft = Math.max(this.positionX, -a)))
        : ((this.imageWidth = this.boxWidth),
          (this.imageHeight = (this.boxWidth / this.aspectRatio) | 0),
          (this.offsetLeft = 0),
          (a = this.imageHeight - a),
          "top" == this.positionY
            ? (this.offsetBaseTop = b)
            : "bottom" == this.positionY
            ? (this.offsetBaseTop = b - a)
            : isNaN(this.positionY)
            ? (this.offsetBaseTop = (b - a / 2) | 0)
            : (this.offsetBaseTop = b + Math.max(this.positionY, -a)));
    },
    render: function () {
      var a = c.scrollTop,
        b = c.scrollLeft,
        e = this.overScrollFix ? c.overScroll : 0,
        d = a + c.winHeight;
      this.boxOffsetBottom > a && this.boxOffsetTop <= d
        ? ((this.visibility = "visible"),
          (this.mirrorTop = this.boxOffsetTop - a),
          (this.mirrorLeft = this.boxOffsetLeft - b),
          (this.offsetTop =
            this.offsetBaseTop - this.mirrorTop * (1 - this.speed)))
        : (this.visibility = "hidden");
      this.$mirror.css({
        transform:
          "translate3d(" +
          this.mirrorLeft +
          "px, " +
          (this.mirrorTop - e) +
          "px, 0px)",
        visibility: this.visibility,
        height: this.boxHeight,
        width: this.boxWidth,
      });
      this.$slider.css({
        transform:
          "translate3d(" +
          this.offsetLeft +
          "px, " +
          this.offsetTop +
          "px, 0px)",
        position: "absolute",
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: "none",
      });
    },
  });
  f.extend(c, {
    scrollTop: 0,
    scrollLeft: 0,
    winHeight: 0,
    winWidth: 0,
    docHeight: 1073741824,
    docWidth: 1073741824,
    sliders: [],
    isReady: !1,
    isFresh: !1,
    isBusy: !1,
    setup: function () {
      function a() {
        if (l == g.pageYOffset) return g.requestAnimationFrame(a), !1;
        l = g.pageYOffset;
        b.render();
        g.requestAnimationFrame(a);
      }
      if (!this.isReady) {
        var b = this,
          e = f(n),
          d = f(g),
          h = function () {
            c.winHeight = d.height();
            c.winWidth = d.width();
            c.docHeight = e.height();
            c.docWidth = e.width();
          },
          k = function () {
            var m = d.scrollTop(),
              q = c.docHeight - c.winHeight,
              r = c.docWidth - c.winWidth;
            c.scrollTop = Math.max(0, Math.min(q, m));
            c.scrollLeft = Math.max(0, Math.min(r, d.scrollLeft()));
            c.overScroll = Math.max(m - q, Math.min(m, 0));
          };
        d.on("resize.px.parallax load.px.parallax", function () {
          h();
          b.refresh();
          c.isFresh = !1;
          c.requestRender();
        }).on("scroll.px.parallax load.px.parallax", function () {
          k();
          c.requestRender();
        });
        h();
        k();
        this.isReady = !0;
        var l = -1;
        a();
      }
    },
    configure: function (a) {
      "object" == typeof a &&
        (delete a.refresh, delete a.render, f.extend(this.prototype, a));
    },
    refresh: function () {
      f.each(this.sliders, function () {
        this.refresh();
      });
      this.isFresh = !0;
    },
    render: function () {
      this.isFresh || this.refresh();
      f.each(this.sliders, function () {
        this.render();
      });
    },
    requestRender: function () {
      this.render();
      this.isBusy = !1;
    },
    destroy: function (a) {
      var b,
        e = f(a).data("px.parallax");
      e.$mirror.remove();
      for (b = 0; b < this.sliders.length; b += 1)
        this.sliders[b] == e && this.sliders.splice(b, 1);
      f(a).data("px.parallax", !1);
      0 === this.sliders.length &&
        (f(g).off("scroll.px.parallax resize.px.parallax load.px.parallax"),
        (this.isReady = !1),
        (c.isSetup = !1));
    },
  });
  var t = f.fn.parallax;
  f.fn.parallax = function (a) {
    return this.each(function () {
      var b = f(this),
        e = "object" == typeof a && a;
      this == g || this == n || b.is("body")
        ? c.configure(e)
        : b.data("px.parallax")
        ? "object" == typeof a && f.extend(b.data("px.parallax"), e)
        : ((e = f.extend({}, b.data(), e)),
          b.data("px.parallax", new c(this, e)));
      if ("string" == typeof a)
        if ("destroy" == a) c.destroy(this);
        else c[a]();
    });
  };
  f.fn.parallax.Constructor = c;
  f.fn.parallax.noConflict = function () {
    f.fn.parallax = t;
    return this;
  };
  f(function () {
    f('[data-parallax="scroll"]').parallax();
  });
})(jQuery, window, document);
$(".newsletter-parallax").parallax({ imageSrc: "./img/newsletter-bg.jpg" });
