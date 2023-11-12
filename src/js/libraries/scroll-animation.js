// get started
// chenge scrollingAnim('.class') in you script
// const animStart = 2; // (height 100% / 2)
// add class if scroll is == 50% to height

export function scrollingAnim(cl) {
  const animItems = document.querySelectorAll(cl);

  if (animItems.length > 0) {
    window.addEventListener('scroll' , animOnScroll);
    function animOnScroll(){
      for (let i = 0; i < animItems.length; i++) {
        const animItem        = animItems[i];
        const animItemHeight  = animItem.offsetHeight;
        const animItemOffset  = offset(animItem).top;
        const animStart = 2;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if(animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
          animItem.classList.add('_active');
        } else {
          if(!animItem.classList.contains('anim-no-hide'))
          animItem.classList.remove('_active');
        }
      }
    }
    setTimeout(() => {
      animOnScroll();
    }, 300);
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop  = window.pageYOffset || document.documentElement.scrollTop;

    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
}
