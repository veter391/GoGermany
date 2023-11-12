/*:: Get started
  :: connect this script with you js
  :: create html tab structure and add data-tabs name
  :: connect libraries/tabs.scss with you scss file
  :: edite the style of you tabs in file tabs scss
  :: run next command wit you script:
        const tab = new tabs('you data-tabs name');


  :: it is possible to change the settings and create multi tabs
    const tab = new tabs('tab', {
      isChanged: (tabs) => {
        console.log(tabs);
      }
    });
    const secondTab = new tabs('second-tab', {
      isChanged: (tabs) => {
        console.log(tabs.tabList);
      }
    })
    :: you can select the active button by issuing this command using number in querySelector(#.....3)
    secondTab.switchTabs(document.querySelector('#second-tab3'))

*/

export class Tabs {
	constructor(selector, options) {
		let defaultOptions = {
			isChanged: () => {}
		}
		this.options = Object.assign(defaultOptions, options);
		this.selector = selector;
		this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
		if (this.tabs) {
			this.tabList = this.tabs.querySelector('.tabs__list');
			this.tabsBtns = this.tabList.querySelectorAll('.tabs__btn');
			this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
		} else {
			console.error(`Selector data-tabs="${selector}" do not exist !!!`);
			return;
		}
		this.check();
		this.init();
		this.events();
	}
	check() {
		if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
			console.error(`Elements with data-tabs="${this.selector}" are repeat !!!   data-tab="..." should not be repeated!`)
			return;
		}

		if (this.tabsBtns.length !== this.tabsPanels.length) {
			console.error(`Number of buttons and tabs do not match !!!`)
			return;
		}
	}

	init() {
		this.tabList.setAttribute('role', 'tablist');
		this.tabsBtns.forEach((el,i) => {
			el.setAttribute('role', 'tab');
			el.setAttribute('tabindex', '-1');
			el.setAttribute('id', `${this.selector}${i + 1}`);
			el.classList.remove('tabs__btn--active');
		});

		this.tabsPanels.forEach((el,i) => {
			el.setAttribute('role', 'tabpanel');
			el.setAttribute('tabindex', '-1');
			el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
			el.classList.remove('tabs__panel--active');
		});

		this.tabsBtns[0].classList.add('tabs__btn--active');
		this.tabsBtns[0].removeAttribute('tabindex');
		this.tabsBtns[0].setAttribute('aria-selected', 'true');

		this.tabsPanels[0].classList.add('tabs__panel--active');
	}

	events() {
		this.tabsBtns.forEach((el,i) =>{
			el.addEventListener('click' , (e) => {
				let currentTab = this.tabList.querySelector('[aria-selected]');

				if (e.currentTarget !== currentTab) {
					this.switchTabs(e.currentTarget, currentTab);
				}
			});

			el.addEventListener('keydown' , (e) => {
				let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
				let dir = null;
				// array left
				if (e.which === 37) {
					dir = index - 1;
				} else	if (e.which === 39) {
					dir = index + 1;
				} else	if (e.which === 40) {
					dir = 'down';
				} else {
					dir = null;
				}

				console.log(dir)

				if (dir !== null) {
					if(dir === 'down') {
						this.tabsPanels[i].focus();
					} else if (this.tabsBtns[dir]) {
						this.switchTabs(this.tabsBtns[dir], e.currentTarget);
					}
				}
			});
		});
	}

	switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
		newTab.focus();
		newTab.removeAttribute('tabindex')
		newTab.setAttribute('aria-selected', 'true');

		oldTab.removeAttribute('aria-selected');
		oldTab.setAttribute('tabindex', '-1');

		let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
		let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

		this.tabsPanels[oldIndex].classList.remove('tabs__panel--active');
		this.tabsPanels[index].classList.add('tabs__panel--active');

		this.tabsBtns[oldIndex].classList.remove('tabs__btn--active');
		this.tabsBtns[index].classList.add('tabs__btn--active');

		this.options.isChanged(this);
	}
}
