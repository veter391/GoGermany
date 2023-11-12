// Get started create const paddingOffset = window.innerWidth - document.body.offsetWidth; in you script
// export const paddingOffset = window.innerWidth - document.body.offsetWidth;
// enable scroll
export function disableScroll() {
	const pageY = window.scrollY;
  document.documentElement.style.scrollBehavior = 'none';
	document.body.classList.add('not-scroll');
	// padding replacement for elements with class shift-scroll
	document.querySelectorAll('.shift-scroll').forEach((el) => {
		const initialPadding = Number(getComputedStyle(el).paddingRight.split('px').join(''));
		el.style.paddingRight = initialPadding + paddingOffset +'px';
	});
	document.body.dataset.position = pageY;
	document.body.style.top = -pageY + 'px';
}
// disable scroll
export function enableScroll() {
	const pageY = parseInt(document.body.dataset.position, 10);
	// return padding initial with elements con class shift-scroll
	document.querySelectorAll('.shift-scroll').forEach((el) => {
		const initialPadding = Number(getComputedStyle(el).paddingRight.split('px').join(''));
		el.style.paddingRight = initialPadding - paddingOffset +'px';
	});
	document.body.style.top = 'auto';
	document.body.classList.remove('not-scroll');
	window.scroll({ top: pageY, left: 0});
	document.body.removeAttribute('data-position');
  document.documentElement.style.scrollBehavior = 'smooth';
}
