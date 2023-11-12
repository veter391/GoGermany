import {disableScroll , enableScroll} from "./in-out-scroll.js"; /* add funcions for fade disabled and enable scroll */

// Get started burger
// use html burger and nav tags
// and add atributes data-burger for burger
// and data-nav for burger list
// !!! important !!!
// for using burger need to connect css burger librari,
// and js in-out-scroll librari

// burger initial
// burger();
export function burger() {
  // if document?. is check if exist element
  const burger = document?.querySelector('[data-burger]');
  const nav = document?.querySelector('[data-nav]');
  const navItems = nav?.querySelectorAll('a');
  const header = document?.querySelector('.header');
  const headerHeight = header.offsetHeight;


  const maxWidth = window.matchMedia("(max-width: 1024px)")
  mediaResize(maxWidth) // Call listener function at run time
  maxWidth.addListener(mediaResize) // Attach listener function on state changes

  burger?.addEventListener('click', () => {
    burger?.classList.toggle('burger--active');
    nav?.classList.toggle('nav--visible');
    nav.style.transitionDuration = '.3s';



    if (nav?.classList.contains('nav--visible')) {
      burger?.setAttribute('aria-expanded', 'true');
      burger?.setAttribute('aria-label', 'Закрыть меню');
      // disableScroll();
    } else {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      // enableScroll();
    }
  });
  burger?.addEventListener('blur', () => {
    burger?.classList.remove('burger--active');
    nav?.classList.remove('nav--visible');
  });

  window.addEventListener('scroll', () => {
    nav.style.transitionDuration = '0s';
    burger?.classList.remove('burger--active');
    nav?.classList.remove('nav--visible');
  });

  // disabled burger use click for nav__link!!!
  navItems.forEach(el => {
    el.addEventListener('click' , () => {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      burger?.classList.remove('burger--active');
      nav?.classList.remove('nav--visible');
      // enableScroll();
    });
  });

  // resize function
  function mediaResize(maxWidth) {
    maxWidth.matches ? nav.style.cssText = `top:${headerHeight}px; height:calc(100vh - ${headerHeight}px);` : nav.style.cssText = `top:auto; height:auto; transition-property: none;`;
  }
}
