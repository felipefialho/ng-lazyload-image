(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-lazyload-image', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['ng-lazyload-image'] = {}, global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators));
}(this, function (exports, core, common, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    var cssClassNames = {
        loaded: 'ng-lazyloaded',
        loading: 'ng-lazyloading',
        failed: 'ng-failed-lazyloaded'
    };
    function removeCssClassName(element, cssClassName) {
        element.className = element.className.replace(cssClassName, '');
    }
    function addCssClassName(element, cssClassName) {
        if (!element.className.includes(cssClassName)) {
            element.className += " " + cssClassName;
        }
    }
    function hasCssClassName(element, cssClassName) {
        return element.className && element.className.includes(cssClassName);
    }

    function isWindowDefined() {
        return typeof window !== 'undefined';
    }
    function isChildOfPicture(element) {
        return Boolean(element.parentElement && element.parentElement.nodeName.toLowerCase() === 'picture');
    }
    function isImageElement(element) {
        return element.nodeName.toLowerCase() === 'img';
    }
    function setImage(element, imagePath, useSrcset) {
        if (isImageElement(element)) {
            if (useSrcset) {
                element.srcset = imagePath;
            }
            else {
                element.src = imagePath;
            }
        }
        else {
            element.style.backgroundImage = "url('" + imagePath + "')";
        }
        return element;
    }
    function setSources(attrName) {
        return function (image) {
            var sources = image.parentElement.getElementsByTagName('source');
            for (var i = 0; i < sources.length; i++) {
                var attrValue = sources[i].getAttribute(attrName);
                if (attrValue) {
                    sources[i].srcset = attrValue;
                }
            }
        };
    }
    var setSourcesToDefault = setSources('defaultImage');
    var setSourcesToLazy = setSources('lazyLoad');
    var setSourcesToError = setSources('errorImage');
    function setImageAndSources(setSourcesFn) {
        return function (element, imagePath, useSrcset) {
            if (isImageElement(element) && isChildOfPicture(element)) {
                setSourcesFn(element);
            }
            if (imagePath) {
                setImage(element, imagePath, useSrcset);
            }
        };
    }
    var setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
    var setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
    var setImageAndSourcesToError = setImageAndSources(setSourcesToError);

    var end = function (_a) {
        var element = _a.element;
        return addCssClassName(element, cssClassNames.loaded);
    };
    var loadImage = function (_a) {
        var element = _a.element, useSrcset = _a.useSrcset, imagePath = _a.imagePath;
        var img;
        if (isImageElement(element) && isChildOfPicture(element)) {
            var parentClone = element.parentNode.cloneNode(true);
            img = parentClone.getElementsByTagName('img')[0];
            setSourcesToLazy(img);
            setImage(img, imagePath, useSrcset);
        }
        else {
            img = new Image();
            if (isImageElement(element) && element.sizes) {
                img.sizes = element.sizes;
            }
            if (useSrcset) {
                img.srcset = imagePath;
            }
            else {
                img.src = imagePath;
            }
        }
        return rxjs.Observable.create(function (observer) {
            img.onload = function () {
                observer.next(imagePath);
                observer.complete();
            };
            img.onerror = function (err) {
                observer.error(null);
            };
        });
    };
    var setErrorImage = function (_a) {
        var element = _a.element, errorImagePath = _a.errorImagePath, useSrcset = _a.useSrcset;
        setImageAndSourcesToError(element, errorImagePath, useSrcset);
        addCssClassName(element, cssClassNames.failed);
    };
    var setLoadedImage = function (_a) {
        var element = _a.element, imagePath = _a.imagePath, useSrcset = _a.useSrcset;
        setImageAndSourcesToLazy(element, imagePath, useSrcset);
    };
    var setup = function (_a) {
        var element = _a.element, defaultImagePath = _a.defaultImagePath, useSrcset = _a.useSrcset;
        setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
        if (hasCssClassName(element, cssClassNames.loaded)) {
            removeCssClassName(element, cssClassNames.loaded);
        }
    };
    var sharedPreset = {
        finally: end,
        loadImage: loadImage,
        setErrorImage: setErrorImage,
        setLoadedImage: setLoadedImage,
        setup: setup
    };

    var Rect = /** @class */ (function () {
        function Rect(left, top, right, bottom) {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
        }
        Rect.fromElement = function (element) {
            var _a = element.getBoundingClientRect(), left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom;
            if (left === 0 && top === 0 && right === 0 && bottom === 0) {
                return Rect.empty;
            }
            else {
                return new Rect(left, top, right, bottom);
            }
        };
        Rect.fromWindow = function (_window) {
            return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
        };
        Rect.prototype.inflate = function (inflateBy) {
            this.left -= inflateBy;
            this.top -= inflateBy;
            this.right += inflateBy;
            this.bottom += inflateBy;
        };
        Rect.prototype.intersectsWith = function (rect) {
            return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
        };
        Rect.prototype.getIntersectionWith = function (rect) {
            var left = Math.max(this.left, rect.left);
            var top = Math.max(this.top, rect.top);
            var right = Math.min(this.right, rect.right);
            var bottom = Math.min(this.bottom, rect.bottom);
            if (right >= left && bottom >= top) {
                return new Rect(left, top, right, bottom);
            }
            else {
                return Rect.empty;
            }
        };
        Rect.empty = new Rect(0, 0, 0, 0);
        return Rect;
    }());

    var scrollListeners = new WeakMap();
    function sampleObservable(obs, scheduler) {
        return obs.pipe(operators.sampleTime(100, scheduler), operators.share(), operators.startWith(''));
    }
    // Only create one scroll listener per target and share the observable.
    // Typical, there will only be one observable per application
    var getScrollListener = function (scrollTarget) {
        if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
            if (isWindowDefined()) {
                console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
            }
            return rxjs.empty();
        }
        var scrollListener = scrollListeners.get(scrollTarget);
        if (scrollListener) {
            return scrollListener;
        }
        var srollEvent = rxjs.Observable.create(function (observer) {
            var eventName = 'scroll';
            var handler = function (event) { return observer.next(event); };
            var options = { passive: true, capture: false };
            scrollTarget.addEventListener(eventName, handler, options);
            return function () { return scrollTarget.removeEventListener(eventName, handler, options); };
        });
        var listener = sampleObservable(srollEvent);
        scrollListeners.set(scrollTarget, listener);
        return listener;
    };

    var isVisible = function (_a, getWindow) {
        var element = _a.element, offset = _a.offset, scrollContainer = _a.scrollContainer;
        if (getWindow === void 0) { getWindow = function () { return window; }; }
        var elementBounds = Rect.fromElement(element);
        if (elementBounds === Rect.empty) {
            return false;
        }
        var windowBounds = Rect.fromWindow(getWindow());
        elementBounds.inflate(offset);
        if (scrollContainer) {
            var scrollContainerBounds = Rect.fromElement(scrollContainer);
            var intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
            return elementBounds.intersectsWith(intersection);
        }
        else {
            return elementBounds.intersectsWith(windowBounds);
        }
    };
    var getObservable = function (attributes) {
        if (attributes.scrollObservable) {
            return attributes.scrollObservable.pipe(operators.startWith(''));
        }
        if (attributes.scrollContainer) {
            return getScrollListener(attributes.scrollContainer);
        }
        return getScrollListener(isWindowDefined() ? window : undefined);
    };
    var scrollPreset = Object.assign({}, sharedPreset, {
        isVisible: isVisible,
        getObservable: getObservable
    });

    function cretateHooks(options) {
        if (!options) {
            return scrollPreset;
        }
        var hooks = {};
        if (options.preset) {
            Object.assign(hooks, options.preset);
        }
        else {
            Object.assign(hooks, scrollPreset);
        }
        Object.keys(options)
            .filter(function (key) { return key !== 'preset'; })
            .forEach(function (key) {
            hooks[key] = options[key];
        });
        return hooks;
    }

    function lazyLoadImage(hookSet, attributes) {
        return function (scrollObservable) {
            return scrollObservable.pipe(operators.filter(function (event) {
                return hookSet.isVisible({
                    element: attributes.element,
                    event: event,
                    offset: attributes.offset,
                    scrollContainer: attributes.scrollContainer
                });
            }), operators.take(1), operators.mergeMap(function () { return hookSet.loadImage(attributes); }), operators.tap(function (imagePath) {
                return hookSet.setLoadedImage({
                    element: attributes.element,
                    imagePath: imagePath,
                    useSrcset: attributes.useSrcset
                });
            }), operators.map(function () { return true; }), operators.catchError(function () {
                hookSet.setErrorImage(attributes);
                return rxjs.of(false);
            }), operators.tap(function () { return hookSet.finally(attributes); }));
        };
    }

    var LazyLoadImageDirective = /** @class */ (function () {
        function LazyLoadImageDirective(el, ngZone, platformId, options) {
            this.platformId = platformId;
            this.onLoad = new core.EventEmitter(); // Callback when an image is loaded
            this.elementRef = el;
            this.ngZone = ngZone;
            this.propertyChanges$ = new rxjs.ReplaySubject();
            this.hooks = cretateHooks(options);
        }
        LazyLoadImageDirective.prototype.ngOnChanges = function () {
            this.propertyChanges$.next({
                element: this.elementRef.nativeElement,
                imagePath: this.lazyImage,
                defaultImagePath: this.defaultImage,
                errorImagePath: this.errorImage,
                useSrcset: this.useSrcset,
                offset: this.offset ? this.offset | 0 : 0,
                scrollContainer: this.scrollTarget,
                scrollObservable: this.scrollObservable
            });
        };
        LazyLoadImageDirective.prototype.ngAfterContentInit = function () {
            var _this = this;
            // Disable lazy load image in server side
            if (common.isPlatformServer(this.platformId)) {
                return null;
            }
            this.ngZone.runOutsideAngular(function () {
                _this.scrollSubscription = _this.propertyChanges$
                    .pipe(operators.tap(function (attributes) { return _this.hooks.setup(attributes); }), operators.switchMap(function (attributes) { return _this.hooks.getObservable(attributes).pipe(lazyLoadImage(_this.hooks, attributes)); }))
                    .subscribe(function (success) { return _this.onLoad.emit(success); });
            });
        };
        LazyLoadImageDirective.prototype.ngOnDestroy = function () {
            if (this.scrollSubscription) {
                this.scrollSubscription.unsubscribe();
            }
        };
        __decorate([
            core.Input('lazyLoad'),
            __metadata("design:type", String)
        ], LazyLoadImageDirective.prototype, "lazyImage", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LazyLoadImageDirective.prototype, "defaultImage", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LazyLoadImageDirective.prototype, "errorImage", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", rxjs.Observable)
        ], LazyLoadImageDirective.prototype, "scrollObservable", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Number)
        ], LazyLoadImageDirective.prototype, "offset", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], LazyLoadImageDirective.prototype, "useSrcset", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", core.EventEmitter)
        ], LazyLoadImageDirective.prototype, "onLoad", void 0);
        LazyLoadImageDirective = __decorate([
            core.Directive({
                selector: '[lazyLoad]'
            }),
            __param(2, core.Inject(core.PLATFORM_ID)), __param(3, core.Optional()), __param(3, core.Inject('options')),
            __metadata("design:paramtypes", [core.ElementRef, core.NgZone, Object, Object])
        ], LazyLoadImageDirective);
        return LazyLoadImageDirective;
    }());

    var LazyLoadImageModule = /** @class */ (function () {
        function LazyLoadImageModule() {
        }
        LazyLoadImageModule_1 = LazyLoadImageModule;
        LazyLoadImageModule.forRoot = function (options) {
            return {
                ngModule: LazyLoadImageModule_1,
                providers: [{ provide: 'options', useValue: options }]
            };
        };
        var LazyLoadImageModule_1;
        LazyLoadImageModule = LazyLoadImageModule_1 = __decorate([
            core.NgModule({
                declarations: [LazyLoadImageDirective],
                exports: [LazyLoadImageDirective]
            })
        ], LazyLoadImageModule);
        return LazyLoadImageModule;
    }());

    var observers = new WeakMap();
    var intersectionSubject = new rxjs.Subject();
    function loadingCallback(entrys) {
        entrys.forEach(function (entry) { return intersectionSubject.next(entry); });
    }
    var getIntersectionObserver = function (attributes) {
        if (!attributes.scrollContainer && !isWindowDefined()) {
            return rxjs.empty();
        }
        var options = {
            root: attributes.scrollContainer
        };
        if (attributes.offset) {
            options.rootMargin = attributes.offset + "px";
        }
        var scrollContainer = attributes.scrollContainer || window;
        var observer = observers.get(scrollContainer);
        if (!observer) {
            observer = new IntersectionObserver(loadingCallback, options);
            observers.set(scrollContainer, observer);
        }
        observer.observe(attributes.element);
        return rxjs.Observable.create(function (obs) {
            var subscription = intersectionSubject.pipe(operators.filter(function (entry) { return entry.target === attributes.element; })).subscribe(obs);
            return function () {
                subscription.unsubscribe();
                observer.unobserve(attributes.element);
            };
        });
    };

    var isVisible$1 = function (_a) {
        var event = _a.event;
        return event.isIntersecting;
    };
    var getObservable$1 = function (attributes, _getInterObserver) {
        if (_getInterObserver === void 0) { _getInterObserver = getIntersectionObserver; }
        if (attributes.scrollObservable) {
            return attributes.scrollObservable;
        }
        return _getInterObserver(attributes);
    };
    var intersectionObserverPreset = Object.assign({}, sharedPreset, {
        isVisible: isVisible$1,
        getObservable: getObservable$1
    });

    exports.LazyLoadImageDirective = LazyLoadImageDirective;
    exports.LazyLoadImageModule = LazyLoadImageModule;
    exports.intersectionObserverPreset = intersectionObserverPreset;
    exports.scrollPreset = scrollPreset;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-lazyload-image.umd.js.map
