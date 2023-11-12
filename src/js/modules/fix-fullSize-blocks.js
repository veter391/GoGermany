/* # Usage.
this code is calculate height and add --vh variable in yuor css code.
use this variable for ful-size blocks(mobile sizes)
## Exemple:
.header {
  height:100vh; // IE
  height:calc(var(--vh) * 100); // others
}
*/
const vhCalc = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
vhCalc()
window.addEventListener('resize', ()=> {
  vhCalc();
});
