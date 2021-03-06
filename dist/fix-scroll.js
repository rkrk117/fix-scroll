(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SCROLLABLE_CLASSNAME = 'fs--scrollable';
var PREVENT_SCROLL_DATASET = 'fsScrollable';
var DELTA_DATASET = 'fsDelta';

var findTarget = function findTarget(e) {
	var target = e.target;
	while (target !== null) {
		if (target.classList && target.classList.contains(SCROLLABLE_CLASSNAME)) {
			break;
		}
		target = target.parentNode;
	}
	return target;
};

var touchstartEventHandler = function touchstartEventHandler(e, fixScroll) {
	var target = findTarget(e);
	if (target) {
		var scrollTop = target.scrollTop;
		var totalScroll = target.scrollHeight;
		var height = target.clientHeight;
		target.dataset[DELTA_DATASET] = e.touches[0].clientY;

		if (height === totalScroll) {
			target.dataset[PREVENT_SCROLL_DATASET] = 'true';
		}
	}
};

var touchmoveEventHandler = function touchmoveEventHandler(e, fixScroll) {
	if (!fixScroll.getState()) {
		var target = findTarget(e);
		if (target) {
			if (target.dataset[PREVENT_SCROLL_DATASET] === 'true') {
				e.preventDefault();
			} else {
				var scrollTop = target.scrollTop;
				var totalScroll = target.scrollHeight;
				var currentScroll = scrollTop + target.offsetHeight;
				var delta = parseFloat(target.dataset[DELTA_DATASET]);
				var currentDelta = e.touches[0].clientY;

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

var touchendEventHandler = function touchendEventHandler(e, fixScroll) {
	var target = findTarget(e);
	if (target) {
		target.dataset[PREVENT_SCROLL_DATASET] = 'false';
	}
};

var bindEvents = function bindEvents(fixScroll) {
	document.addEventListener('touchstart', function (e) {
		return touchstartEventHandler(e, fixScroll);
	});
	document.addEventListener('touchmove', function (e) {
		return touchmoveEventHandler(e, fixScroll);
	});
	document.addEventListener('touchend', function (e) {
		return touchendEventHandler(e, fixScroll);
	});
};

var FixScroll = function () {
	function FixScroll() {
		_classCallCheck(this, FixScroll);

		this.state = true;
		bindEvents(this);
	}

	_createClass(FixScroll, [{
		key: 'getState',
		value: function getState() {
			return this.state;
		}
	}, {
		key: 'hide',
		value: function hide() {
			var currentWidth = this.getCurrentWidth();
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = currentWidth + 'px';
			this.state = false;
		}
	}, {
		key: 'show',
		value: function show() {
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';
			this.state = true;
		}
	}, {
		key: 'toggle',
		value: function toggle() {
			if (this.getState()) {
				this.hide();
			} else {
				this.show();
			}
		}
	}, {
		key: 'getWidth',
		value: function getWidth() {
			var overflowCurrentProperty = document.body.style.overflow;
			var width = 0;
			document.body.style.overflow = 'scroll';
			width = this.getCurrentWidth();
			document.body.style.overflow = overflowCurrentProperty;
			return width;
		}
	}, {
		key: 'getCurrentWidth',
		value: function getCurrentWidth() {
			var documentWidth = document.documentElement.clientWidth;
			var windowWidth = window.innerWidth;
			var currentWidth = windowWidth - documentWidth;
			return currentWidth;
		}
	}]);

	return FixScroll;
}();

var fixScroll = exports.fixScroll = new FixScroll();

/***/ })
/******/ ]);
});