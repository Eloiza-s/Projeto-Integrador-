import { Dr as ViewEncapsulation, Gl as operate, Kl as Observable, Vl as map, Wi as setClassMetadata, Wl as createOperatorSubscriber, cn as Component, cu as __spreadArray, qc as SecurityContext, ro as ɵɵdefineComponent, su as __read } from "./core-C6AyQ1gY.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/empty.js
var EMPTY = new Observable(function(subscriber) {
	return subscriber.complete();
});
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js
var isArray$1 = Array.isArray;
function callOrApply(fn, args) {
	return isArray$1(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
}
function mapOneOrManyArgs(fn) {
	return map(function(args) {
		return callOrApply(fn, args);
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf;
var objectProto = Object.prototype;
var getKeys = Object.keys;
function argsArgArrayOrObject(args) {
	if (args.length === 1) {
		var first_1 = args[0];
		if (isArray(first_1)) return {
			args: first_1,
			keys: null
		};
		if (isPOJO(first_1)) {
			var keys = getKeys(first_1);
			return {
				args: keys.map(function(key) {
					return first_1[key];
				}),
				keys
			};
		}
	}
	return {
		args,
		keys: null
	};
}
function isPOJO(obj) {
	return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/util/createObject.js
function createObject(keys, values) {
	return keys.reduce(function(result, key, i) {
		return result[key] = values[i], result;
	}, {});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/take.js
function take(count) {
	return count <= 0 ? function() {
		return EMPTY;
	} : operate(function(source, subscriber) {
		var seen = 0;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			if (++seen <= count) {
				subscriber.next(value);
				if (count <= seen) subscriber.complete();
			}
		}));
	});
}
//#endregion
//#region node_modules/@angular/cdk/fesm2022/private.mjs
var _VisuallyHiddenLoader = class _VisuallyHiddenLoader {
	static ɵfac = function _VisuallyHiddenLoader_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || _VisuallyHiddenLoader)();
	};
	static ɵcmp = /*@__PURE__*/ ɵɵdefineComponent({
		type: _VisuallyHiddenLoader,
		selectors: [["ng-component"]],
		exportAs: ["cdkVisuallyHidden"],
		decls: 0,
		vars: 0,
		template: function _VisuallyHiddenLoader_Template(rf, ctx) {},
		styles: [".cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  white-space: nowrap;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  left: 0;\n}\n[dir=rtl] .cdk-visually-hidden {\n  left: auto;\n  right: 0;\n}\n"],
		encapsulation: 2
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_VisuallyHiddenLoader, [{
		type: Component,
		args: [{
			exportAs: "cdkVisuallyHidden",
			encapsulation: ViewEncapsulation.None,
			template: "",
			styles: [".cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  white-space: nowrap;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  left: 0;\n}\n[dir=rtl] .cdk-visually-hidden {\n  left: auto;\n  right: 0;\n}\n"]
		}]
	}], null, null);
})();
var policy;
function getPolicy() {
	if (policy === void 0) {
		policy = null;
		if (typeof window !== "undefined") {
			const ttWindow = window;
			if (ttWindow.trustedTypes !== void 0) try {
				policy = ttWindow.trustedTypes.createPolicy("angular#components", { createHTML: (s) => s });
			} catch (error) {
				console.error(error);
			}
		}
	}
	return policy;
}
function trustedHTMLFromString(html) {
	return getPolicy()?.createHTML(html) || html;
}
function _setInnerHtml(element, html, sanitizer) {
	const cleanHtml = sanitizer.sanitize(SecurityContext.HTML, html);
	if (cleanHtml === null && (typeof ngDevMode === "undefined" || ngDevMode)) throw new Error(`Could not sanitize HTML: ${html}`);
	element.innerHTML = trustedHTMLFromString(cleanHtml || "");
}
//#endregion
export { createObject as a, take as i, _setInnerHtml as n, argsArgArrayOrObject as o, trustedHTMLFromString as r, mapOneOrManyArgs as s, _VisuallyHiddenLoader as t };
