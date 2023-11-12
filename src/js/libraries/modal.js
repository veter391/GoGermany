/* ::: Get Started :::
start plugin, and use user or default options
 const modal = new Modal({
 	isOpen: (modal) => {
 		console.log('opened');
 	},
 	isClose: () => {
 		console.log('closed')
 	},
 });
*/
export class Modal {
	// create constructor
	constructor(options) {
		// adding defaul options
		let defaultOptions = {
			isOpen: () => {},
			isClose: () => {},
      speed: 300,
		}

		this.options = Object.assign(defaultOptions, options);
		// search modal parent class
		this.modal   = document.querySelector('.modal');
		this.speed   = this.options.speed;
		this.animation = false;
		this.isOpen  = false;
		this.modalContainer = false;
		this.prevFocus = false;
		// search if exist fix or absolute blocks
		this.fixBlocks	 = document.querySelectorAll('.fix-block');
		// array from the focusible elements
		this.focusEl = [
			'button',
			'a[href]',
			'select',
			'input',
			'textarea',
      'iframe',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
		];
		// run events function
		this.events();
	}

	events() {
		// if modal exist add event click and others
		if (this.modal) {
			document.addEventListener('click', function(el) {
				// serch and add data-path atributes
				const clickEl = el.target.closest('[data-path]');
				// if click to button and this have atribute data-path
				if (clickEl) {
					// check all data atributes for this data(path, animation, speed)
					let target = clickEl.dataset.path;
					let animation = clickEl.dataset.animation;
					let speed = clickEl.dataset.speed;
					// add animation and speed time efect depend to data
					this.animation = animation ? animation : 'fade';
					this.speed = speed ? parseInt(speed) : this.speed;
					// concat button and modal if btn == modal
					this.modalContainer = document.querySelector(`[data-target="${target}"]`);
					// run open function and return(breack code)
					this.open();
					return;
				}
				// if click to button and class modal-close
				if (el.target.closest('.modal__close')) {
					//run close function and return(breack code)
					this.close();
					return;
				}
				// adding bind
			}.bind(this));
			// event keydown Esc
			window.addEventListener('keydown', function(e) {
				//check if modal is open and close if click Esc
				if (e.keyCode == 27 && this.isOpen) {
					this.close();
				} else if (e.keyCode == 9 && this.isOpen) {
					this.focusCatch(e);
					return;
				}
			}.bind(this));
			// event click if to click modal parent
			this.modal.addEventListener('click', function(e) {
				//check if modal is open and close if click to parent (not childs!!)
				if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
					this.close();
				}
			}.bind(this));
		}
	}

	open() {
		// add prev to modal activ element
		this.prevFocus = document.activeElement;
		// add scss style var
		// console.log(this.modal.style.setProperty('transition-time'))
    this.modal.style.setProperty('--modal-duration', `${this.speed / 1000}s`);
    // add class open to modal
    this.modal.classList.add('is-open');
    // run disabledScroll functioin
    this.disableScroll();
		// add class open to modal container(child) and add animation class
    this.modalContainer.classList.add('modal-open');
    this.modalContainer.classList.add(this.animation);

    // run timer for fade animarion
    setTimeout(() => {
    	// add inline-block to modal container(child)
    	this.modalContainer.classList.add('animate-open');
    	this.options.isOpen(this);
    	// isOpen add true
    	this.isOpen = true;
    	// add focus to first element in modal window
    	this.focusTrap();
    }, this.speed);
	}

	close() {
		// if modalContainer exist
		if (this.modalContainer) {
			// remove class open and add class close
			this.modalContainer.classList.remove('animate-open');
			this.modalContainer.classList.add('animate-close');
			// add close animation and remove classes and animations
			setTimeout(() => {
				this.modalContainer.classList.remove(this.animation);
				this.modalContainer.classList.remove('animate-close');
				this.modalContainer.classList.remove('modal-open');
				this.modal.classList.remove('is-open');
			}, this.speed)

			// enable scroll, add false to isOpen and quit focus to elements from modal
			this.enableScroll();
			this.options.isClose(this);
			this.isOpen = false;
			this.focusTrap();
		}
	}

	focusCatch(el) {
		// search focusable element convert all focusables elements in modal to array and check indexses tu focusables elements
		const focusable = this.modalContainer.querySelectorAll(this.focusEl);
		const focusArray = Array.prototype.slice.call(focusable);
		const focusedIndex = focusArray.indexOf(document.activeElement);
		// if keypressed shift and tab go to left <=
		if(el.shiftKey && focusedIndex === 0) {
			focusArray[focusArray.length - 1].focus();
			el.preventDefault();
		}
		// if keypressed shift go to right =>
		if(!el.shiftKey && focusedIndex === focusArray.length - 1) {
			focusArray[0].focus();
			el.preventDefault();
		}
	}
	// focus to first element in modal
	focusTrap() {
		// search first focusable element
		const focusable = this.modalContainer.querySelectorAll(this.focusEl);
		// if is opened add focus for this element
		// else close modal return to last focusable element and add focus for this
		(this.isOpen && focusable) ? focusable[0].focus() : this.prevFocus.focus();
	}
	// disable scroll if modal is active
	disableScroll() {
    let pageY = window.scrollY;
    this.lockPadding();
    document.body.classList.add('not-scroll');
    document.body.dataset.position = pageY;
    document.body.style.top = -pageY + 'px';
	}
	// disable scroll if modal is closed
	enableScroll() {
    let pageY = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('not-scroll');
    window.scroll({ top: pageY, left: 0});
    document.body.removeAttribute('data-position');
	}

	lockPadding() {
		let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
		this.fixBlocks.forEach((e) => {
			e.style.paddingRight = paddingOffset;
		});
		document.body.style.paddingRight = paddingOffset;
	}

	unlockPadding() {
		this.fixBlocks.forEach((e) => {
			e.style.paddingRight = '0px';
		});
		document.body.style.paddingRight = '0px';
	}
}
