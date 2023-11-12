export class Accordion {
	constructor(selector, options) {
		let defaultOptions = {
			isOpen: () => {},
			isClose: () => {},
			speed: 300,
			classes: {
				parentClass: 'accordion',
				listClass:'accordion__controls',
				itemClass:'accordion__item',
				buttonClass: 'accordion__btn',
				contentClass:'accordion__content',
				AnimationClass: 'accordion--animation'
			},
			oneActive:true,
			oneFixed:true,
		};

		this.options = Object.assign(defaultOptions, options);
		this.selector = selector;
		this.element = 0;
		this.accordion = document.querySelector(`[data-accordion="${selector}"]`);
		if (this.accordion) {
			this.accordionList = this.accordion.querySelector('.' + this.options.classes.listClass);
			this.accordionItem = this.accordion.querySelectorAll('.' + this.options.classes.itemClass);
			this.accordionBtns = this.accordion.querySelectorAll('.' + this.options.classes.buttonClass);
			this.accordionContent = this.accordion.querySelectorAll('.' + this.options.classes.contentClass);
		} else {
			console.error(`Selector data-accordion="${selector}" do not exist !!! or you forgot to include it in your js file !`)
			return;
		}
		this.check();
		this.init();
		this.events();
	}

	check() {
		if (document.querySelectorAll(`[data-accordion="${this.selector}"]`).length > 1) {
			console.error(`Elements with data-accordion="${this.selector}" are repeat !!!   data-accordion="..." should not be repeated!`)
			return;
		}

		if (this.accordionBtns.length !== this.accordionContent.length) {
			console.error(`Number of accordion buttons and contents do not match !!!`)
			return;
		}
	}

	init() {
		this.accordionList.setAttribute('aria-label', 'Accordion Control Group Buttons');
		this.accordionBtns.forEach((el,i) => {
			el.setAttribute('aria-controls', `content-${i + 1}`);
			el.setAttribute('aria-expanded', false);
			this.accordionContent[i].setAttribute('aria-hidden', true);
		});

		if(this.options.oneFixed == true) {
      this.accordionList.style.setProperty('--accordion-duration', `${0}s`);
			this.accordionItem[0].classList.add(this.options.classes.AnimationClass);
			this.accordionBtns[0].setAttribute('aria-expanded', true);
			this.accordionContent[0].setAttribute('aria-hidden', false);
			this.accordionContent[0].style.maxHeight = this.accordionContent[0].scrollHeight + 'px';
		}

    setTimeout(() => {
			this.accordionList.style.setProperty('--accordion-duration', `${this.options.speed / 1000}s`);
		}, 20);
	}

	events() {
		this.accordionBtns.forEach((el,i) => {
			el.addEventListener('click', () => {
				this.element = i;
				this.accordionItem[i].classList.toggle('open');
				this.accordionItem[i].classList.contains('open') ? this.open() : this.close();
			});
			if (this.options.oneActive == true && this.options.oneFixed == false) {
				el.addEventListener('blur', () => {
					this.accordionItem.forEach((e) => {
						e.classList.remove('open');
					});
				});
			}
		});
	}

	open() {
		if (this.options.oneActive == true) {
			this.accordionItem.forEach((e,i) => {
				if(this.options.oneFixed == true) {
					e.classList.remove('open');
				}
				e.classList.remove(this.options.classes.AnimationClass);
				this.accordionBtns[i].setAttribute('aria-expanded', false);
				this.accordionContent[i].setAttribute('aria-hidden', true);
				this.accordionContent[i].style.maxHeight = null;
			});
		}
		this.accordionItem[this.element].classList.add(this.options.classes.AnimationClass);
		this.accordionBtns[this.element].setAttribute('aria-expanded', true);
		this.accordionContent[this.element].setAttribute('aria-hidden', false);
		this.accordionContent[this.element].style.maxHeight = this.accordionContent[this.element].scrollHeight + 'px';
		this.options.isOpen(this);
	}

	close() {
		this.accordionItem[this.element].classList.remove(this.options.classes.AnimationClass);
		this.accordionBtns[this.element].setAttribute('aria-expanded', false);
		this.accordionContent[this.element].setAttribute('aria-hidden', true);
		this.accordionContent[this.element].style.maxHeight = null;
		this.options.isClose(this);
	}
}


