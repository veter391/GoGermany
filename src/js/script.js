// import diferents modules:
import {isWebp} from "./imports.js";
// import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
// import {fade, unfade} from "./libraries/fade-unfade.js";
import LazyLoad from "vanilla-lazyload";
import "focus-visible";
// import { validateForms } from './libraries/validate-form.js';
// import "simplebar";
// import * as myfun from "./modules/functions.js"

window.addEventListener('DOMContentLoaded', function () {
  // check webp
  isWebp();
  // connect lazy load
  new LazyLoad({
    elements_selector: '.lazy' ,
  });

  // :::::::::::::::::Timer:::::::::::::::::::::
  const dateline = '2024-10-02';

  const getDateRemaining = (endtime) => {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date()),
          timeZone = new Date().getTimezoneOffset();

    if (t <= 0) {
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;
    } else {
      days = Math.floor(t / 1000 / 60 / 60 / 24),
      hours = Math.floor(t / 1000 / 60 / 60) % 24 + (timeZone / 60),
      minutes = Math.floor(t / 1000 / 60) % 60,
      seconds = Math.floor(t / 1000) % 60;
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };

  const getZero = (num) => {
    if(num >= 0 && num < 10) {
      return `0${num}`;
    }

    return num;
  };

  const setClock = (element, endtime) => {
    // add timezone
    const timer = document.querySelector(element),
          days = timer.querySelector('.days'),
          hours = timer.querySelector('.hours'),
          minutes = timer.querySelector('.minutes'),
          seconds = timer.querySelector('.seconds'),
          timeInterval = setInterval(updateClock, 1000);

    // run function
    updateClock();

    function updateClock() {
      const t = getDateRemaining(endtime);

      const d = t.days,
            h = t.hours,
            m = t.minutes,
            s = t.seconds;

      // if (d < 5) {
      //   days.nextElementSibling.textContent = 'дня';
      // } else {
      //   days.nextElementSibling.textContent = 'дней';
      // }

      // if (h == 21 || h == 1) {
      //   hours.nextElementSibling.textContent = 'час';
      // } else if ((h < 5 && h > 0) || h > 21) {
      //   hours.nextElementSibling.textContent = 'часа';
      // } else {
      //   hours.nextElementSibling.textContent = 'часов';
      // }

      // if (m == 1 || m == 21 || m == 31 || m == 41 || m == 51) {
      //   minutes.nextElementSibling.textContent = 'минута';
      // } else if ((m > 0 && m < 5) || (m > 21 && m < 24) || (m > 31 && m < 34) || (m > 41 && m < 44) || (m > 51 && m < 54)) {
      //   minutes.nextElementSibling.textContent = 'минуты';
      // } else {
      //   minutes.nextElementSibling.textContent = 'минут';
      // }

      // if (s == 1 || s == 21 || s == 31 || s == 41 || s == 51) {
      //   seconds.nextElementSibling.textContent = 'секунда';
      // } else if ((s > 0 && s < 5) || (s > 21 && s < 24) || (s > 31 && s < 34) || (s > 41 && s < 44) || (s > 51 && s < 54)) {
      //   seconds.nextElementSibling.textContent = 'секунды';
      // } else {
      //   seconds.nextElementSibling.textContent = 'секунд';
      // }

      days.textContent = getZero(d);
      hours.textContent = getZero(h);
      minutes.textContent = getZero(m);
      seconds.textContent = getZero(s);

      // days.nextElementSibling.textContent = 'hello';

      if(t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock('.timer', dateline);




  // ::::::::::::heart canvas

  window.requestAnimationFrame =
    window.__requestAnimationFrame ||
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        (function () {
            return function (callback, element) {
                var lastTime = element.__lastTime;
                if (lastTime === undefined) {
                    lastTime = 0;
                }
                var currTime = Date.now();
                var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                window.setTimeout(callback, timeToCall);
                element.__lastTime = currTime + timeToCall;
            };
        })();
  window.isDevice = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(((navigator.userAgent || navigator.vendor || window.opera)).toLowerCase()));
  var loaded = false;
  var init = function () {
      if (loaded) return;
      loaded = true;
      var mobile = window.isDevice;
      var koef = mobile ? 1.2 : 1;
      var canvas = document.getElementById('heart');
      var ctx = canvas.getContext('2d');
      var width = canvas.width = koef * innerWidth;
      var height = canvas.height = koef * innerHeight;
      var rand = Math.random;
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, width, height);

      var heartPosition = function (rad) {
          //return [Math.sin(rad), Math.cos(rad)];
          return [Math.pow(Math.sin(rad), 3), -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad))];
      };
      var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
          return [dx + pos[0] * sx, dy + pos[1] * sy];
      };

      window.addEventListener('resize', function () {
          width = canvas.width = koef * innerWidth;
          height = canvas.height = koef * innerHeight;
          ctx.fillStyle = "rgba(0,0,0,1)";
          ctx.fillRect(0, 0, width, height);
      });

      var traceCount = mobile ? 30 : 50;
      var pointsOrigin = [];
      var i;
      var dr = mobile ? 0.1 : 0.1;
      for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
      for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
      for (i = 0; i < Math.PI * 2; i += dr) pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
      var heartPointsCount = pointsOrigin.length;

      var targetPoints = [];
      var pulse = function (kx, ky) {
          for (i = 0; i < pointsOrigin.length; i++) {
              targetPoints[i] = [];
              targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
              targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
          }
      };

      var e = [];
      for (i = 0; i < heartPointsCount; i++) {
          var x = rand() * width;
          var y = rand() * height;
          e[i] = {
              vx: 0,
              vy: 0,
              R: 2,
              speed: rand() + 5,
              q: ~~(rand() * heartPointsCount),
              D: 2 * (i % 2) - 1,
              force: 0.2 * rand() + 0.7,
              f: "rgba(0,0,0, .7)",
              // f: "hsla(285," + ~~(40 * rand() + 60) + "%," + ~~(60 * rand() + 20) + "%,.3)",
              trace: []
          };
          for (var k = 0; k < traceCount; k++) e[i].trace[k] = {x: x, y: y};
      }

      var config = {
          traceK: 0.4,
          timeDelta: 0.01
      };

      var time = 0;
      var loop = function () {
          var n = -Math.cos(time);
          pulse((1 + n) * .5, (1 + n) * .5);
          time += ((Math.sin(time)) < 0 ? 9 : (n > 0.8) ? .2 : 1) * config.timeDelta;
          ctx.fillStyle = "rgba(0,0,0,.5)";
          ctx.clearRect(0, 0, width, height);
          for (i = e.length; i--;) {
              var u = e[i];
              var q = targetPoints[u.q];
              var dx = u.trace[0].x - q[0];
              var dy = u.trace[0].y - q[1];
              var length = Math.sqrt(dx * dx + dy * dy);
              if (10 > length) {
                  if (0.95 < rand()) {
                      u.q = ~~(rand() * heartPointsCount);
                  }
                  else {
                      if (0.99 < rand()) {
                          u.D *= -1;
                      }
                      u.q += u.D;
                      u.q %= heartPointsCount;
                      if (0 > u.q) {
                          u.q += heartPointsCount;
                      }
                  }
              }
              u.vx += -dx / length * u.speed;
              u.vy += -dy / length * u.speed;
              u.trace[0].x += u.vx;
              u.trace[0].y += u.vy;
              u.vx *= u.force;
              u.vy *= u.force;
              for (k = 0; k < u.trace.length - 1;) {
                  var T = u.trace[k];
                  var N = u.trace[++k];
                  N.x -= config.traceK * (N.x - T.x);
                  N.y -= config.traceK * (N.y - T.y);
              }
              ctx.fillStyle = u.f;
              for (k = 0; k < u.trace.length; k++) {
                  ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
              }
          }
          //ctx.fillStyle = "rgba(255,255,255,1)";
          //for (i = u.trace.length; i--;) ctx.clearRect(targetPoints[i][0], targetPoints[i][1], 2, 2);

          window.requestAnimationFrame(loop, canvas);
      };
      loop();
  };

  var s = document.readyState;
  if (s === 'complete' || s === 'loaded' || s === 'interactive') init();
  else document.addEventListener('DOMContentLoaded', init, false);
});





