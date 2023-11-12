// Данный файл - лишь собрание подключений готовых компонентов.

// ::::: Определение операционной системы на мобильных :::::
// export { mobileCheck } from "./libraries/mobile-check";
// console.log(mobileCheck())

// ::::: Определение ширины экрана :::::
// export { isMobile, isTablet, isDesktop } from './libraries/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// ::::: Реализация бургер-меню :::::
export { burger } from './libraries/burger.js';
// burger();

// ::::: Реализация остановки, включения скролла (не забудьте вызвать функцию) :::::
// export {disableScroll , enableScroll} from "./libraries/in-out-scroll.js";
// const paddingOffset = window.innerWidth - document.body.offsetWidth;

// ::::: Реализация модального окна :::::
export { Modal } from "./libraries/modal.js";
// const modal = new Modal();

// ::::: Реализация табов :::::
// export { Tabs } from "./libraries/tabs.js";
// // requiere data name!!
// const tab = new Tabs('tab', {
// 	isChanged: (tabs) => {
// 		console.log(tabs);
// 		console.log(tabs.tabList);
// 	}
// });
// tab.switchTabs(document.querySelector('#tab3'));

// ::::: Реализация аккордеона :::::
// export { Accordion } from "./libraries/accordion.js";
// const accordion = new Accordion('accordion', {});
// const accordion2 = new Accordion('accordion2', {
// 	oneFixed:false,
// 	oneActive:false,
// 	speed:700
// });

// ::::: Получение высоты шапки сайта (не забудьте вызвать функцию) :::::
// export { getHeaderHeight } from './libraries/header-height';

// ::::: Подключение плагина кастом-скролла :::::
// import 'simplebar';
// use data-simplebar for html tag
// and connect css librari

// ::::: Подключение плагина для позиционирования тултипов :::::
// export { createPopper, right} from '@popperjs/core';
// createPopper(el, tooltip, {
//   placement: 'right'
// });

// ::::: Подключение свайпера :::::
// import Swiper, { Navigation, Pagination } from 'swiper';
// Swiper.use([Navigation, Pagination]);
// const swiper = new Swiper('.class', {
//   slidesPerView: 'auto',
// });

// ::::: Подключение анимаций по скроллу :::::
// export {scrollingAnim} from "./libraries/scroll-animation.js";
// scrollingAnim('.anim-item') // or add custom class;
// ::: or use special plugin
// import AOS from 'aos';
// AOS.init();

// ::::: Подключение параллакса блоков при скролле :::::
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// ::::: Подключение плавной прокрутки к якорям :::::
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');

// ::::: Подключение событий свайпа на мобильных :::::
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

// ::::: lazy loading images :::::
// import LazyLoad from "vanilla-lazyload";
// new LazyLoad({
//   elements_selector: '.lazy' ,
// });

// ::::: focus visible :::::
// import "focus-visible";

// ::::: add fade and unfade effect in you script :::::
// export {fade, unfade} from "./libraries/fade-unfade.js";

// ::::: add annimate text and console effect :::::
// export {consoleText} from "./libraries/console-text.js";
// consoleText(['Hello, i’m Nazar.', 'I like css, js animations.'],'.header__title');

// ::::: check and add class to body, depending of suport webp images :::::
export {isWebp} from "./libraries/check-webp-support.js";


// import $, { css } from "jquery";
// import JustValidate from 'just-validate';
