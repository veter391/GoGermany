// get start
// this function check if browser is suported webp images if yes add class webp to body
// else add class no-webp
// in you script change this function, use isWebp();
export function isWebp() {
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if(support === true) {
      document.body.classList.add('webp')
    } else {
      document.body.classList.add('no-webp');
    }
  });
}
