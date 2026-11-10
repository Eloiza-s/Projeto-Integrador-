import { Al as ɵɵdefineInjectable, Ca as ɵɵclassProp, Dr as ViewEncapsulation, En as ElementRef, Fn as Injectable, Gl as operate, In as Input, Kl as Observable, O as booleanAttribute, Pl as ɵɵinject, Pn as Inject, Ql as Subscription, Qn as Optional, Sa as ɵɵclassMap, Sc as ErrorHandler, Ul as Subject, Vl as map, Wi as setClassMetadata, Wl as createOperatorSubscriber, Yl as SafeSubscriber, _c as DOCUMENT, ao as ɵɵdefineNgModule, cn as Component, cs as ɵɵprojectionDef, cu as __spreadArray, dl as inject, eu as isFunction, f as HostAttributeToken, jl as ɵɵdefineInjector, kc as InjectionToken, qc as SecurityContext, ql as identity, qn as NgModule, ro as ɵɵdefineComponent, ss as ɵɵprojection, su as __read, ya as ɵɵattribute } from "./core-C6AyQ1gY.js";
import { a as createObject, i as take, o as argsArgArrayOrObject, r as trustedHTMLFromString, s as mapOneOrManyArgs } from "./private-DVh1FeF4.js";
import { G as of, H as finalize, J as innerFrom, Y as popResultSelector, l as HttpClient } from "./http-l3nqjMXS.js";
import { t as BidiModule } from "./bidi-CxEBo-Ce.js";
import { r as DomSanitizer } from "./platform-browser-CTV82uAs.js";
//#region node_modules/rxjs/dist/esm5/internal/observable/throwError.js
function throwError(errorOrErrorFactory, scheduler) {
	var errorFactory = isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
		return errorOrErrorFactory;
	};
	var init = function(subscriber) {
		return subscriber.error(errorFactory());
	};
	return new Observable(scheduler ? function(subscriber) {
		return scheduler.schedule(init, 0, subscriber);
	} : init);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js
function forkJoin() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var resultSelector = popResultSelector(args);
	var _a = argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
	var result = new Observable(function(subscriber) {
		var length = sources.length;
		if (!length) {
			subscriber.complete();
			return;
		}
		var values = new Array(length);
		var remainingCompletions = length;
		var remainingEmissions = length;
		var _loop_1 = function(sourceIndex) {
			var hasValue = false;
			innerFrom(sources[sourceIndex]).subscribe(createOperatorSubscriber(subscriber, function(value) {
				if (!hasValue) {
					hasValue = true;
					remainingEmissions--;
				}
				values[sourceIndex] = value;
			}, function() {
				return remainingCompletions--;
			}, void 0, function() {
				if (!remainingCompletions || !hasValue) {
					if (!remainingEmissions) subscriber.next(keys ? createObject(keys, values) : values);
					subscriber.complete();
				}
			}));
		};
		for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) _loop_1(sourceIndex);
	});
	return resultSelector ? result.pipe(mapOneOrManyArgs(resultSelector)) : result;
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/catchError.js
function catchError(selector) {
	return operate(function(source, subscriber) {
		var innerSub = null;
		var syncUnsub = false;
		var handledResult;
		innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
			handledResult = innerFrom(selector(err, catchError(selector)(source)));
			if (innerSub) {
				innerSub.unsubscribe();
				innerSub = null;
				handledResult.subscribe(subscriber);
			} else syncUnsub = true;
		}));
		if (syncUnsub) {
			innerSub.unsubscribe();
			innerSub = null;
			handledResult.subscribe(subscriber);
		}
	});
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/share.js
function share(options) {
	if (options === void 0) options = {};
	var _a = options.connector, connector = _a === void 0 ? function() {
		return new Subject();
	} : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
	return function(wrapperSource) {
		var connection;
		var resetConnection;
		var subject;
		var refCount = 0;
		var hasCompleted = false;
		var hasErrored = false;
		var cancelReset = function() {
			resetConnection === null || resetConnection === void 0 || resetConnection.unsubscribe();
			resetConnection = void 0;
		};
		var reset = function() {
			cancelReset();
			connection = subject = void 0;
			hasCompleted = hasErrored = false;
		};
		var resetAndUnsubscribe = function() {
			var conn = connection;
			reset();
			conn === null || conn === void 0 || conn.unsubscribe();
		};
		return operate(function(source, subscriber) {
			refCount++;
			if (!hasErrored && !hasCompleted) cancelReset();
			var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
			subscriber.add(function() {
				refCount--;
				if (refCount === 0 && !hasErrored && !hasCompleted) resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
			});
			dest.subscribe(subscriber);
			if (!connection && refCount > 0) {
				connection = new SafeSubscriber({
					next: function(value) {
						return dest.next(value);
					},
					error: function(err) {
						hasErrored = true;
						cancelReset();
						resetConnection = handleReset(reset, resetOnError, err);
						dest.error(err);
					},
					complete: function() {
						hasCompleted = true;
						cancelReset();
						resetConnection = handleReset(reset, resetOnComplete);
						dest.complete();
					}
				});
				innerFrom(source).subscribe(connection);
			}
		})(wrapperSource);
	};
}
function handleReset(reset, on) {
	var args = [];
	for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
	if (on === true) {
		reset();
		return;
	}
	if (on === false) return;
	var onSubscriber = new SafeSubscriber({ next: function() {
		onSubscriber.unsubscribe();
		reset();
	} });
	return innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
}
//#endregion
//#region node_modules/rxjs/dist/esm5/internal/operators/tap.js
function tap(observerOrNext, error, complete) {
	var tapObserver = isFunction(observerOrNext) || error || complete ? {
		next: observerOrNext,
		error,
		complete
	} : observerOrNext;
	return tapObserver ? operate(function(source, subscriber) {
		var _a;
		(_a = tapObserver.subscribe) === null || _a === void 0 || _a.call(tapObserver);
		var isUnsub = true;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			var _a;
			(_a = tapObserver.next) === null || _a === void 0 || _a.call(tapObserver, value);
			subscriber.next(value);
		}, function() {
			var _a;
			isUnsub = false;
			(_a = tapObserver.complete) === null || _a === void 0 || _a.call(tapObserver);
			subscriber.complete();
		}, function(err) {
			var _a;
			isUnsub = false;
			(_a = tapObserver.error) === null || _a === void 0 || _a.call(tapObserver, err);
			subscriber.error(err);
		}, function() {
			var _a, _b;
			if (isUnsub) (_a = tapObserver.unsubscribe) === null || _a === void 0 || _a.call(tapObserver);
			(_b = tapObserver.finalize) === null || _b === void 0 || _b.call(tapObserver);
		}));
	}) : identity;
}
//#endregion
//#region node_modules/@angular/material/fesm2022/_icon-registry-chunk.mjs
function getMatIconNameNotFoundError(iconName) {
	return Error(`Unable to find icon with the name "${iconName}"`);
}
function getMatIconNoHttpProviderError() {
	return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.");
}
function getMatIconFailedToSanitizeUrlError(url) {
	return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${url}".`);
}
function getMatIconFailedToSanitizeLiteralError(literal) {
	return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${literal}".`);
}
var SvgIconConfig = class {
	url;
	svgText;
	options;
	svgElement = null;
	constructor(url, svgText, options) {
		this.url = url;
		this.svgText = svgText;
		this.options = options;
	}
};
var MatIconRegistry = class MatIconRegistry {
	_httpClient;
	_sanitizer;
	_errorHandler;
	_document;
	_svgIconConfigs = /* @__PURE__ */ new Map();
	_iconSetConfigs = /* @__PURE__ */ new Map();
	_cachedIconsByUrl = /* @__PURE__ */ new Map();
	_inProgressUrlFetches = /* @__PURE__ */ new Map();
	_fontCssClassesByAlias = /* @__PURE__ */ new Map();
	_resolvers = [];
	_defaultFontSetClass;
	constructor(_httpClient, _sanitizer, document, _errorHandler) {
		this._httpClient = _httpClient;
		this._sanitizer = _sanitizer;
		this._errorHandler = _errorHandler;
		this._document = document;
	}
	addSvgIcon(iconName, url, options) {
		return this.addSvgIconInNamespace("", iconName, url, options);
	}
	addSvgIconLiteral(iconName, literal, options) {
		return this.addSvgIconLiteralInNamespace("", iconName, literal, options);
	}
	addSvgIconInNamespace(namespace, iconName, url, options) {
		return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig(url, null, options));
	}
	addSvgIconResolver(resolver) {
		this._resolvers.push(resolver);
		return this;
	}
	addSvgIconLiteralInNamespace(namespace, iconName, literal, options) {
		const cleanLiteral = this._sanitizer.sanitize(SecurityContext.HTML, literal);
		if (!cleanLiteral) throw getMatIconFailedToSanitizeLiteralError(literal);
		const trustedLiteral = trustedHTMLFromString(cleanLiteral);
		return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig("", trustedLiteral, options));
	}
	addSvgIconSet(url, options) {
		return this.addSvgIconSetInNamespace("", url, options);
	}
	addSvgIconSetLiteral(literal, options) {
		return this.addSvgIconSetLiteralInNamespace("", literal, options);
	}
	addSvgIconSetInNamespace(namespace, url, options) {
		return this._addSvgIconSetConfig(namespace, new SvgIconConfig(url, null, options));
	}
	addSvgIconSetLiteralInNamespace(namespace, literal, options) {
		const cleanLiteral = this._sanitizer.sanitize(SecurityContext.HTML, literal);
		if (!cleanLiteral) throw getMatIconFailedToSanitizeLiteralError(literal);
		const trustedLiteral = trustedHTMLFromString(cleanLiteral);
		return this._addSvgIconSetConfig(namespace, new SvgIconConfig("", trustedLiteral, options));
	}
	registerFontClassAlias(alias, classNames = alias) {
		this._fontCssClassesByAlias.set(alias, classNames);
		return this;
	}
	classNameForFontAlias(alias) {
		return this._fontCssClassesByAlias.get(alias) || alias;
	}
	setDefaultFontSetClass(...classNames) {
		this._defaultFontSetClass = classNames;
		return this;
	}
	getDefaultFontSetClass() {
		this._defaultFontSetClass ??= inferDefaultFontSetClass(this._document);
		return this._defaultFontSetClass;
	}
	getSvgIconFromUrl(safeUrl) {
		const url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
		if (!url) throw getMatIconFailedToSanitizeUrlError(safeUrl);
		const cachedIcon = this._cachedIconsByUrl.get(url);
		if (cachedIcon) return of(cloneSvg(cachedIcon));
		return this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl, null)).pipe(tap((svg) => this._cachedIconsByUrl.set(url, svg)), map((svg) => cloneSvg(svg)));
	}
	getNamedSvgIcon(name, namespace = "") {
		const key = iconKey(namespace, name);
		let config = this._svgIconConfigs.get(key);
		if (config) return this._getSvgFromConfig(config);
		config = this._getIconConfigFromResolvers(namespace, name);
		if (config) {
			this._svgIconConfigs.set(key, config);
			return this._getSvgFromConfig(config);
		}
		const iconSetConfigs = this._iconSetConfigs.get(namespace);
		if (iconSetConfigs) return this._getSvgFromIconSetConfigs(name, iconSetConfigs);
		return throwError(getMatIconNameNotFoundError(key));
	}
	ngOnDestroy() {
		this._resolvers = [];
		this._svgIconConfigs.clear();
		this._iconSetConfigs.clear();
		this._cachedIconsByUrl.clear();
	}
	_getSvgFromConfig(config) {
		if (config.svgText) return of(cloneSvg(this._svgElementFromConfig(config)));
		else return this._loadSvgIconFromConfig(config).pipe(map((svg) => cloneSvg(svg)));
	}
	_getSvgFromIconSetConfigs(name, iconSetConfigs) {
		const namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
		if (namedIcon) return of(namedIcon);
		return forkJoin(iconSetConfigs.filter((iconSetConfig) => !iconSetConfig.svgText).map((iconSetConfig) => {
			return this._loadSvgIconSetFromConfig(iconSetConfig).pipe(catchError((err) => {
				const errorMessage = `Loading icon set URL: ${this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, iconSetConfig.url)} failed: ${err.message}`;
				this._errorHandler.handleError(new Error(errorMessage));
				return of(null);
			}));
		})).pipe(map(() => {
			const foundIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
			if (!foundIcon) throw getMatIconNameNotFoundError(name);
			return foundIcon;
		}));
	}
	_extractIconWithNameFromAnySet(iconName, iconSetConfigs) {
		for (let i = iconSetConfigs.length - 1; i >= 0; i--) {
			const config = iconSetConfigs[i];
			if (config.svgText && config.svgText.toString().indexOf(iconName) > -1) {
				const svg = this._svgElementFromConfig(config);
				const foundIcon = this._extractSvgIconFromSet(svg, iconName, config.options);
				if (foundIcon) return foundIcon;
			}
		}
		return null;
	}
	_loadSvgIconFromConfig(config) {
		return this._fetchIcon(config).pipe(tap((svgText) => config.svgText = svgText), map(() => this._svgElementFromConfig(config)));
	}
	_loadSvgIconSetFromConfig(config) {
		if (config.svgText) return of(null);
		return this._fetchIcon(config).pipe(tap((svgText) => config.svgText = svgText));
	}
	_extractSvgIconFromSet(iconSet, iconName, options) {
		const iconSource = iconSet.querySelector(`[id="${iconName}"]`);
		if (!iconSource) return null;
		const iconElement = iconSource.cloneNode(true);
		iconElement.removeAttribute("id");
		if (iconElement.nodeName.toLowerCase() === "svg") return this._setSvgAttributes(iconElement, options);
		if (iconElement.nodeName.toLowerCase() === "symbol") return this._setSvgAttributes(this._toSvgElement(iconElement), options);
		const svg = this._svgElementFromString(trustedHTMLFromString("<svg></svg>"));
		svg.appendChild(iconElement);
		return this._setSvgAttributes(svg, options);
	}
	_svgElementFromString(str) {
		const div = this._document.createElement("DIV");
		div.innerHTML = str;
		const svg = div.querySelector("svg");
		if (!svg) throw Error("<svg> tag not found");
		return svg;
	}
	_toSvgElement(element) {
		const svg = this._svgElementFromString(trustedHTMLFromString("<svg></svg>"));
		const attributes = element.attributes;
		for (let i = 0; i < attributes.length; i++) {
			const { name, value } = attributes[i];
			if (name !== "id") svg.setAttribute(name, value);
		}
		for (let i = 0; i < element.childNodes.length; i++) if (element.childNodes[i].nodeType === this._document.ELEMENT_NODE) svg.appendChild(element.childNodes[i].cloneNode(true));
		return svg;
	}
	_setSvgAttributes(svg, options) {
		svg.setAttribute("fit", "");
		svg.setAttribute("height", "100%");
		svg.setAttribute("width", "100%");
		svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
		svg.setAttribute("focusable", "false");
		if (options && options.viewBox) svg.setAttribute("viewBox", options.viewBox);
		return svg;
	}
	_fetchIcon(iconConfig) {
		const { url: safeUrl, options } = iconConfig;
		const withCredentials = options?.withCredentials ?? false;
		if (!this._httpClient) throw getMatIconNoHttpProviderError();
		if (safeUrl == null) throw Error(`Cannot fetch icon from URL "${safeUrl}".`);
		const url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
		if (!url) throw getMatIconFailedToSanitizeUrlError(safeUrl);
		const inProgressFetch = this._inProgressUrlFetches.get(url);
		if (inProgressFetch) return inProgressFetch;
		const req = this._httpClient.get(url, {
			responseType: "text",
			withCredentials
		}).pipe(map((svg) => {
			return trustedHTMLFromString(svg);
		}), finalize(() => this._inProgressUrlFetches.delete(url)), share());
		this._inProgressUrlFetches.set(url, req);
		return req;
	}
	_addSvgIconConfig(namespace, iconName, config) {
		this._svgIconConfigs.set(iconKey(namespace, iconName), config);
		return this;
	}
	_addSvgIconSetConfig(namespace, config) {
		const configNamespace = this._iconSetConfigs.get(namespace);
		if (configNamespace) configNamespace.push(config);
		else this._iconSetConfigs.set(namespace, [config]);
		return this;
	}
	_svgElementFromConfig(config) {
		if (!config.svgElement) {
			const svg = this._svgElementFromString(config.svgText);
			this._setSvgAttributes(svg, config.options);
			config.svgElement = svg;
		}
		return config.svgElement;
	}
	_getIconConfigFromResolvers(namespace, name) {
		for (let i = 0; i < this._resolvers.length; i++) {
			const result = this._resolvers[i](name, namespace);
			if (result) return isSafeUrlWithOptions(result) ? new SvgIconConfig(result.url, null, result.options) : new SvgIconConfig(result, null);
		}
	}
	static ɵfac = function MatIconRegistry_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatIconRegistry)(ɵɵinject(HttpClient, 8), ɵɵinject(DomSanitizer), ɵɵinject(DOCUMENT, 8), ɵɵinject(ErrorHandler));
	};
	static ɵprov = /*@__PURE__*/ ɵɵdefineInjectable({
		token: MatIconRegistry,
		factory: MatIconRegistry.ɵfac,
		providedIn: "root"
	});
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIconRegistry, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [
		{
			type: HttpClient,
			decorators: [{ type: Optional }]
		},
		{ type: DomSanitizer },
		{
			type: void 0,
			decorators: [{ type: Optional }, {
				type: Inject,
				args: [DOCUMENT]
			}]
		},
		{ type: ErrorHandler }
	], null);
})();
function cloneSvg(svg) {
	return svg.cloneNode(true);
}
function iconKey(namespace, name) {
	return namespace + ":" + name;
}
function isSafeUrlWithOptions(value) {
	return !!(value.url && value.options);
}
function inferDefaultFontSetClass(document) {
	let materialSymbolsVariation = null;
	let hasLegacyMaterialIcons = false;
	if (document.fonts && typeof document.fonts.forEach === "function") document.fonts.forEach((font) => {
		const family = font.family.replace(/['"]/g, "").trim().toLowerCase();
		if (family === "material icons" || family.startsWith("material icons ")) hasLegacyMaterialIcons = true;
		if (family.startsWith("material symbols rounded")) materialSymbolsVariation = "rounded";
		else if (family.startsWith("material symbols sharp")) materialSymbolsVariation = "sharp";
		else if (family.startsWith("material symbols")) materialSymbolsVariation = "outlined";
	});
	return [materialSymbolsVariation && !hasLegacyMaterialIcons ? `material-symbols-${materialSymbolsVariation}` : "material-icons", "mat-ligature-font"];
}
//#endregion
//#region node_modules/@angular/material/fesm2022/icon.mjs
var MAT_ICON_DEFAULT_OPTIONS = new InjectionToken("MAT_ICON_DEFAULT_OPTIONS");
var MAT_ICON_LOCATION = new InjectionToken("mat-icon-location", {
	providedIn: "root",
	factory: () => {
		const _document = inject(DOCUMENT);
		const _location = _document ? _document.location : null;
		return { getPathname: () => _location ? _location.pathname + _location.search : "" };
	}
});
var funcIriAttributes = [
	"clip-path",
	"color-profile",
	"src",
	"cursor",
	"fill",
	"filter",
	"marker",
	"marker-start",
	"marker-mid",
	"marker-end",
	"mask",
	"stroke"
];
var funcIriAttributeSelector = funcIriAttributes.map((attr) => `[${attr}]`).join(", ");
var funcIriPattern = /^url\(['"]?#(.*?)['"]?\)$/;
var MatIcon = class MatIcon {
	_elementRef = inject(ElementRef);
	_iconRegistry = inject(MatIconRegistry);
	_location = inject(MAT_ICON_LOCATION);
	_errorHandler = inject(ErrorHandler);
	_defaultColor;
	get color() {
		return this._color || this._defaultColor;
	}
	set color(value) {
		this._color = value;
	}
	_color;
	inline = false;
	get svgIcon() {
		return this._svgIcon;
	}
	set svgIcon(value) {
		if (value !== this._svgIcon) {
			if (value) this._updateSvgIcon(value);
			else if (this._svgIcon) this._clearSvgElement();
			this._svgIcon = value;
		}
	}
	_svgIcon;
	get fontSet() {
		return this._fontSet;
	}
	set fontSet(value) {
		const newValue = this._cleanupFontValue(value);
		if (newValue !== this._fontSet) {
			this._fontSet = newValue;
			this._updateFontIconClasses();
		}
	}
	_fontSet;
	get fontIcon() {
		return this._fontIcon;
	}
	set fontIcon(value) {
		const newValue = this._cleanupFontValue(value);
		if (newValue !== this._fontIcon) {
			this._fontIcon = newValue;
			this._updateFontIconClasses();
		}
	}
	_fontIcon;
	_previousFontSetClass = [];
	_previousFontIconClass;
	_svgName = null;
	_svgNamespace = null;
	_previousPath;
	_elementsWithExternalReferences;
	_currentIconFetch = Subscription.EMPTY;
	constructor() {
		const ariaHidden = inject(new HostAttributeToken("aria-hidden"), { optional: true });
		const defaults = inject(MAT_ICON_DEFAULT_OPTIONS, { optional: true });
		if (defaults) {
			if (defaults.color) this.color = this._defaultColor = defaults.color;
			if (defaults.fontSet) this.fontSet = defaults.fontSet;
		}
		if (!ariaHidden) this._elementRef.nativeElement.setAttribute("aria-hidden", "true");
	}
	_splitIconName(iconName) {
		if (!iconName) return ["", ""];
		const parts = iconName.split(":");
		switch (parts.length) {
			case 1: return ["", parts[0]];
			case 2: return parts;
			default: throw Error(`Invalid icon name: "${iconName}"`);
		}
	}
	ngOnInit() {
		this._updateFontIconClasses();
	}
	ngAfterViewChecked() {
		const cachedElements = this._elementsWithExternalReferences;
		if (cachedElements && cachedElements.size) {
			const newPath = this._location.getPathname();
			if (newPath !== this._previousPath) {
				this._previousPath = newPath;
				this._prependPathToReferences(newPath);
			}
		}
	}
	ngOnDestroy() {
		this._currentIconFetch.unsubscribe();
		if (this._elementsWithExternalReferences) this._elementsWithExternalReferences.clear();
	}
	_usingFontIcon() {
		return !this.svgIcon;
	}
	_setSvgElement(svg) {
		this._clearSvgElement();
		const path = this._location.getPathname();
		this._previousPath = path;
		this._cacheChildrenWithExternalReferences(svg);
		this._prependPathToReferences(path);
		this._elementRef.nativeElement.appendChild(svg);
	}
	_clearSvgElement() {
		const layoutElement = this._elementRef.nativeElement;
		let childCount = layoutElement.childNodes.length;
		if (this._elementsWithExternalReferences) this._elementsWithExternalReferences.clear();
		while (childCount--) {
			const child = layoutElement.childNodes[childCount];
			if (child.nodeType !== 1 || child.nodeName.toLowerCase() === "svg") child.remove();
		}
	}
	_updateFontIconClasses() {
		if (!this._usingFontIcon()) return;
		const elem = this._elementRef.nativeElement;
		const fontSetClasses = (this.fontSet ? this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/) : this._iconRegistry.getDefaultFontSetClass()).filter((className) => className.length > 0);
		this._previousFontSetClass.forEach((className) => elem.classList.remove(className));
		fontSetClasses.forEach((className) => elem.classList.add(className));
		this._previousFontSetClass = fontSetClasses;
		if (this.fontIcon !== this._previousFontIconClass && !fontSetClasses.includes("mat-ligature-font")) {
			if (this._previousFontIconClass) elem.classList.remove(this._previousFontIconClass);
			if (this.fontIcon) elem.classList.add(this.fontIcon);
			this._previousFontIconClass = this.fontIcon;
		}
	}
	_cleanupFontValue(value) {
		return typeof value === "string" ? value.trim().split(" ")[0] : value;
	}
	_prependPathToReferences(path) {
		const elements = this._elementsWithExternalReferences;
		const normalizedPath = path.startsWith("//") ? `/.${path}` : path;
		if (elements) elements.forEach((attrs, element) => {
			attrs.forEach((attr) => {
				element.setAttribute(attr.name, `url('${normalizedPath}#${attr.value}')`);
			});
		});
	}
	_cacheChildrenWithExternalReferences(element) {
		const elementsWithFuncIri = element.querySelectorAll(funcIriAttributeSelector);
		const elements = this._elementsWithExternalReferences = this._elementsWithExternalReferences || /* @__PURE__ */ new Map();
		for (let i = 0; i < elementsWithFuncIri.length; i++) funcIriAttributes.forEach((attr) => {
			const elementWithReference = elementsWithFuncIri[i];
			const value = elementWithReference.getAttribute(attr);
			const match = value ? value.match(funcIriPattern) : null;
			if (match) {
				let attributes = elements.get(elementWithReference);
				if (!attributes) {
					attributes = [];
					elements.set(elementWithReference, attributes);
				}
				attributes.push({
					name: attr,
					value: match[1]
				});
			}
		});
	}
	_updateSvgIcon(rawName) {
		this._svgNamespace = null;
		this._svgName = null;
		this._currentIconFetch.unsubscribe();
		if (rawName) {
			const [namespace, iconName] = this._splitIconName(rawName);
			if (namespace) this._svgNamespace = namespace;
			if (iconName) this._svgName = iconName;
			this._currentIconFetch = this._iconRegistry.getNamedSvgIcon(iconName, namespace).pipe(take(1)).subscribe((svg) => this._setSvgElement(svg), (err) => {
				const errorMessage = `Error retrieving icon ${namespace}:${iconName}! ${err.message}`;
				this._errorHandler.handleError(new Error(errorMessage));
			});
		}
	}
	static ɵfac = function MatIcon_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatIcon)();
	};
	static ɵcmp = (function() {
		return /*@__PURE__*/ ɵɵdefineComponent({
			type: MatIcon,
			selectors: [["mat-icon"]],
			hostAttrs: [
				"role",
				"img",
				1,
				"mat-icon",
				"notranslate"
			],
			hostVars: 10,
			hostBindings: function MatIcon_HostBindings(rf, ctx) {
				if (rf & 2) {
					ɵɵattribute("data-mat-icon-type", ctx._usingFontIcon() ? "font" : "svg")("data-mat-icon-name", ctx._svgName || ctx.fontIcon)("data-mat-icon-namespace", ctx._svgNamespace || ctx.fontSet)("fontIcon", ctx._usingFontIcon() ? ctx.fontIcon : null);
					ɵɵclassMap(ctx.color ? "mat-" + ctx.color : "");
					ɵɵclassProp("mat-icon-inline", ctx.inline)("mat-icon-no-color", ctx.color !== "primary" && ctx.color !== "accent" && ctx.color !== "warn");
				}
			},
			inputs: {
				color: "color",
				inline: [
					2,
					"inline",
					"inline",
					booleanAttribute
				],
				svgIcon: "svgIcon",
				fontSet: "fontSet",
				fontIcon: "fontIcon"
			},
			exportAs: ["matIcon"],
			ngContentSelectors: ["*"],
			decls: 1,
			vars: 0,
			template: function MatIcon_Template(rf, ctx) {
				if (rf & 1) {
					ɵɵprojectionDef();
					ɵɵprojection(0);
				}
			},
			styles: ["mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {\n  color: var(--%NS%mat-icon-color, inherit);\n}\n\n.mat-icon {\n  -webkit-user-select: none;\n  user-select: none;\n  background-repeat: no-repeat;\n  display: inline-block;\n  fill: currentColor;\n  height: 24px;\n  width: 24px;\n  overflow: hidden;\n}\n.mat-icon.mat-icon-inline {\n  font-size: inherit;\n  height: inherit;\n  line-height: inherit;\n  width: inherit;\n}\n.mat-icon.mat-ligature-font[fontIcon]::before {\n  content: attr(fontIcon);\n}\n\n[dir=rtl] .mat-icon-rtl-mirror {\n  transform: scale(-1, 1);\n}\n\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {\n  display: block;\n}\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {\n  margin: auto;\n}\n"],
			encapsulation: 2
		});
	})();
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIcon, [{
		type: Component,
		args: [{
			template: "<ng-content></ng-content>",
			selector: "mat-icon",
			exportAs: "matIcon",
			host: {
				"role": "img",
				"class": "mat-icon notranslate",
				"[class]": "color ? \"mat-\" + color : \"\"",
				"[attr.data-mat-icon-type]": "_usingFontIcon() ? \"font\" : \"svg\"",
				"[attr.data-mat-icon-name]": "_svgName || fontIcon",
				"[attr.data-mat-icon-namespace]": "_svgNamespace || fontSet",
				"[attr.fontIcon]": "_usingFontIcon() ? fontIcon : null",
				"[class.mat-icon-inline]": "inline",
				"[class.mat-icon-no-color]": "color !== \"primary\" && color !== \"accent\" && color !== \"warn\""
			},
			encapsulation: ViewEncapsulation.None,
			styles: ["mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {\n  color: var(--mat-icon-color, inherit);\n}\n\n.mat-icon {\n  -webkit-user-select: none;\n  user-select: none;\n  background-repeat: no-repeat;\n  display: inline-block;\n  fill: currentColor;\n  height: 24px;\n  width: 24px;\n  overflow: hidden;\n}\n.mat-icon.mat-icon-inline {\n  font-size: inherit;\n  height: inherit;\n  line-height: inherit;\n  width: inherit;\n}\n.mat-icon.mat-ligature-font[fontIcon]::before {\n  content: attr(fontIcon);\n}\n\n[dir=rtl] .mat-icon-rtl-mirror {\n  transform: scale(-1, 1);\n}\n\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {\n  display: block;\n}\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,\n.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {\n  margin: auto;\n}\n"]
		}]
	}], () => [], {
		color: [{ type: Input }],
		inline: [{
			type: Input,
			args: [{ transform: booleanAttribute }]
		}],
		svgIcon: [{ type: Input }],
		fontSet: [{ type: Input }],
		fontIcon: [{ type: Input }]
	});
})();
var MatIconModule = class MatIconModule {
	static ɵfac = function MatIconModule_Factory(__ngFactoryType__) {
		return new (__ngFactoryType__ || MatIconModule)();
	};
	static ɵmod = /*@__PURE__*/ ɵɵdefineNgModule({
		type: MatIconModule,
		imports: [MatIcon],
		exports: [MatIcon, BidiModule]
	});
	static ɵinj = /*@__PURE__*/ ɵɵdefineInjector({ imports: [BidiModule] });
};
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatIconModule, [{
		type: NgModule,
		args: [{
			imports: [MatIcon],
			exports: [MatIcon, BidiModule]
		}]
	}], null, null);
})();
//#endregion
export { MAT_ICON_DEFAULT_OPTIONS, MAT_ICON_LOCATION, MatIcon, MatIconModule, MatIconRegistry, getMatIconFailedToSanitizeLiteralError, getMatIconFailedToSanitizeUrlError, getMatIconNameNotFoundError, getMatIconNoHttpProviderError };
