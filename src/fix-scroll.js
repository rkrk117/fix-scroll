const SCROLLABLE_CLASSNAME = 'fs--scrollable';
const PREVENT_SCROLL_DATASET = 'fsScrollable';
const DELTA_DATASET = 'fsDelta';

const findTarget = (e) => {
	let target = e.target;
	while (target !== null) {
		if (target.classList && target.classList.contains(SCROLLABLE_CLASSNAME)) {
			break;
		}
		target = target.parentNode;
	}
	return target;
};

const touchstartEventHandler = (e, fixScroll) => {
	const target = findTarget(e);
	if (target) {
		const scrollTop = target.scrollTop;
		const totalScroll = target.scrollHeight;
		const height = target.clientHeight;
		target.dataset[DELTA_DATASET] = e.touches[0].clientY;

		if (height === totalScroll) {
			target.dataset[PREVENT_SCROLL_DATASET] = 'true';
		}
	}
};

const touchmoveEventHandler = (e, fixScroll) => {
	if (!fixScroll.getState()) {
		const target = findTarget(e);
		if (target) {
			if (target.dataset[PREVENT_SCROLL_DATASET] === 'true') {
				e.preventDefault();
			} else {
				const scrollTop = target.scrollTop;
				const totalScroll = target.scrollHeight;
				const currentScroll = scrollTop + target.offsetHeight;
				const delta = parseFloat(target.dataset[DELTA_DATASET]);
				const currentDelta = e.touches[0].clientY;

				if (scrollTop <= 0) {
					if (delta < currentDelta) {
						e.preventDefault();
					}
				} else if (currentScroll >= totalScroll) {
					if (delta > currentDelta) {
						e.preventDefault();
					}
				}
			}
		}
	}
};

const touchendEventHandler = (e, fixScroll) => {
	const target = findTarget(e);
	if (target) {
		target.dataset[PREVENT_SCROLL_DATASET] = 'false';
	}
};

const bindEvents = (fixScroll) => {
	document.addEventListener('touchstart', (e) => touchstartEventHandler(e, fixScroll));
	document.addEventListener('touchmove', (e) => touchmoveEventHandler(e, fixScroll));
	document.addEventListener('touchend', (e) => touchendEventHandler(e, fixScroll));
};

class FixScroll {
	constructor() {
		this.state = true;
		bindEvents(this);
	}

	getState() {
		return this.state;
	}

	hide() {
		const currentWidth = this.getCurrentWidth();
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = currentWidth + 'px';
		this.state = false;
	}

	show() {
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';
		this.state = true;
	}

	toggle() {
		if (this.getState()) {
			this.hide();
		} else {
			this.show();
		}
	}

	getWidth() {
		const overflowCurrentProperty = document.body.style.overflow;
		let width = 0;
		document.body.style.overflow = 'scroll';
		width = this.getCurrentWidth();
		document.body.style.overflow = overflowCurrentProperty;
		return width;
	}

	getCurrentWidth() {
		const documentWidth = document.documentElement.clientWidth;
		const windowWidth = window.innerWidth;
		const currentWidth = windowWidth - documentWidth;
		return currentWidth;
	}
}

export const fixScroll = new FixScroll();
