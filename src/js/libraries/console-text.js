// add animated texts and diferent colors speed etc...
// function consoleText(["Hello word", "I like play games", "Hi Nigan"], ".title", 300 (.3s), [red, green, blue])
// function usage: myfun.consoleText(['texts' , 'Hello word', 'etc..'], 'class or id', spead, [colors, red, green, blue])
// myfun.consoleText(['Hello, i’m Nazar.', 'I like css, js animations.'],'.header__title');
export function consoleText(words, element, spead, colors) {
  // create variavles
  let visible, letterCount , x , waiting ,target ,usedColor ,usedWord , timerSpead;
  timerSpead = spead || 120 ;
  // create span element
  const line = document.createElement("span");
  // add span element to DOM
  document.querySelector('.header__title-box').appendChild(line);
  // add content to span using inner html
  line.innerHTML = "&#124;";
  // adding styles from created span
  line.style.display = 'inline-block';
  line.style.position = 'relative';
  line.style.left = '-0.05em';

  // if not adding colors to fonction add defaul color white
  if (colors === undefined) colors = ['#fff'];
  // default leteterCounter and x = 1, waiting = false
  letterCount = 1;
  x = 1;
  waiting = false;
  // add function selector
  target = document.querySelector(element)
  // add style atribute if existe diferents colors
  target.setAttribute('style', 'color:' + colors[0])
  // timer function spead for add letters
  window.setInterval(() => {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(() => {
        usedColor = colors.shift();
        colors.push(usedColor);
        usedWord = words.shift();
        words.push(usedWord);
        // variavle x add 1, adding letter
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      // timer function spead for remove letters
      window.setTimeout(() => {
        // variavle x add -1, removeing letter
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, timerSpead)
  // created span(line) add and remove opacity timer
  window.setInterval( () => {
    if (visible !== true) {
      line.style.opacity = 1;
      visible = true;
    } else {
      line.style.opacity = 0;
      visible = false;
    }
  }, 400)
}
