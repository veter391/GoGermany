// fade and unfade in vanilla js
export function fade(element, timeout, display) {
  element.style.opacity = 0;
  element.style.display = display || 'block';
  element.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 10);
}

export function unfade(element, timeout) {
  element.style.opacity = 1;
  element.style.transition = `opacity ${timeout}ms`;
  element.style.opacity = 0;

  setTimeout(() => {
    element.style.display = 'none';
  }, timeout);
}
