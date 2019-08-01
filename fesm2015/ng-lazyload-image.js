import { __decorate, __metadata, __param } from 'tslib';
import { EventEmitter, Input, Output, Directive, Inject, PLATFORM_ID, Optional, ElementRef, NgZone, NgModule } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Observable, empty, of, ReplaySubject, Subject } from 'rxjs';
import { sampleTime, share, startWith, filter, take, mergeMap, tap, map, catchError, switchMap } from 'rxjs/operators';

const cssClassNames = {
    loaded: 'ng-lazyloaded',
    loading: 'ng-lazyloading',
    failed: 'ng-failed-lazyloaded'
};
function removeCssClassName(element, cssClassName) {
    element.className = element.className.replace(cssClassName, '');
}
function addCssClassName(element, cssClassName) {
    if (!element.className.includes(cssClassName)) {
        element.className += ` ${cssClassName}`;
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
        element.style.backgroundImage = `url('${imagePath}')`;
    }
    return element;
}
function setSources(attrName) {
    return (image) => {
        const sources = image.parentElement.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            const attrValue = sources[i].getAttribute(attrName);
            if (attrValue) {
                sources[i].srcset = attrValue;
            }
        }
    };
}
const setSourcesToDefault = setSources('defaultImage');
const setSourcesToLazy = setSources('lazyLoad');
const setSourcesToError = setSources('errorImage');
function setImageAndSources(setSourcesFn) {
    return (element, imagePath, useSrcset) => {
        if (isImageElement(element) && isChildOfPicture(element)) {
            setSourcesFn(element);
        }
        if (imagePath) {
            setImage(element, imagePath, useSrcset);
        }
    };
}
const setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
const setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
const setImageAndSourcesToError = setImageAndSources(setSourcesToError);

const end = ({ element }) => addCssClassName(element, cssClassNames.loaded);
const loadImage = ({ element, useSrcset, imagePath }) => {
    let img;
    if (isImageElement(element) && isChildOfPicture(element)) {
        const parentClone = element.parentNode.cloneNode(true);
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
    return Observable.create((observer) => {
        img.onload = () => {
            observer.next(imagePath);
            observer.complete();
        };
        img.onerror = err => {
            observer.error(null);
        };
    });
};
const setErrorImage = ({ element, errorImagePath, useSrcset }) => {
    setImageAndSourcesToError(element, errorImagePath, useSrcset);
    addCssClassName(element, cssClassNames.failed);
};
const setLoadedImage = ({ element, imagePath, useSrcset }) => {
    setImageAndSourcesToLazy(element, imagePath, useSrcset);
};
const setup = ({ element, defaultImagePath, useSrcset }) => {
    setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
    if (hasCssClassName(element, cssClassNames.loaded)) {
        removeCssClassName(element, cssClassNames.loaded);
    }
};
const sharedPreset = {
    finally: end,
    loadImage,
    setErrorImage,
    setLoadedImage,
    setup
};

class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    static fromElement(element) {
        const { left, top, right, bottom } = element.getBoundingClientRect();
        if (left === 0 && top === 0 && right === 0 && bottom === 0) {
            return Rect.empty;
        }
        else {
            return new Rect(left, top, right, bottom);
        }
    }
    static fromWindow(_window) {
        return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
    }
    inflate(inflateBy) {
        this.left -= inflateBy;
        this.top -= inflateBy;
        this.right += inflateBy;
        this.bottom += inflateBy;
    }
    intersectsWith(rect) {
        return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
    }
    getIntersectionWith(rect) {
        const left = Math.max(this.left, rect.left);
        const top = Math.max(this.top, rect.top);
        const right = Math.min(this.right, rect.right);
        const bottom = Math.min(this.bottom, rect.bottom);
        if (right >= left && bottom >= top) {
            return new Rect(left, top, right, bottom);
        }
        else {
            return Rect.empty;
        }
    }
}
Rect.empty = new Rect(0, 0, 0, 0);

const scrollListeners = new WeakMap();
function sampleObservable(obs, scheduler) {
    return obs.pipe(sampleTime(100, scheduler), share(), startWith(''));
}
// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable per application
const getScrollListener = (scrollTarget) => {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
        if (isWindowDefined()) {
            console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
        }
        return empty();
    }
    const scrollListener = scrollListeners.get(scrollTarget);
    if (scrollListener) {
        return scrollListener;
    }
    const srollEvent = Observable.create((observer) => {
        const eventName = 'scroll';
        const handler = (event) => observer.next(event);
        const options = { passive: true, capture: false };
        scrollTarget.addEventListener(eventName, handler, options);
        return () => scrollTarget.removeEventListener(eventName, handler, options);
    });
    const listener = sampleObservable(srollEvent);
    scrollListeners.set(scrollTarget, listener);
    return listener;
};

const isVisible = ({ element, offset, scrollContainer }, getWindow = () => window) => {
    const elementBounds = Rect.fromElement(element);
    if (elementBounds === Rect.empty) {
        return false;
    }
    const windowBounds = Rect.fromWindow(getWindow());
    elementBounds.inflate(offset);
    if (scrollContainer) {
        const scrollContainerBounds = Rect.fromElement(scrollContainer);
        const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
        return elementBounds.intersectsWith(intersection);
    }
    else {
        return elementBounds.intersectsWith(windowBounds);
    }
};
const getObservable = (attributes) => {
    if (attributes.scrollObservable) {
        return attributes.scrollObservable.pipe(startWith(''));
    }
    if (attributes.scrollContainer) {
        return getScrollListener(attributes.scrollContainer);
    }
    return getScrollListener(isWindowDefined() ? window : undefined);
};
const scrollPreset = Object.assign({}, sharedPreset, {
    isVisible,
    getObservable
});

function cretateHooks(options) {
    if (!options) {
        return scrollPreset;
    }
    const hooks = {};
    if (options.preset) {
        Object.assign(hooks, options.preset);
    }
    else {
        Object.assign(hooks, scrollPreset);
    }
    Object.keys(options)
        .filter(key => key !== 'preset')
        .forEach(key => {
        hooks[key] = options[key];
    });
    return hooks;
}

function lazyLoadImage(hookSet, attributes) {
    return (scrollObservable) => {
        return scrollObservable.pipe(filter(event => hookSet.isVisible({
            element: attributes.element,
            event: event,
            offset: attributes.offset,
            scrollContainer: attributes.scrollContainer
        })), take(1), mergeMap(() => hookSet.loadImage(attributes)), tap(imagePath => hookSet.setLoadedImage({
            element: attributes.element,
            imagePath,
            useSrcset: attributes.useSrcset
        })), map(() => true), catchError(() => {
            hookSet.setErrorImage(attributes);
            return of(false);
        }), tap(() => hookSet.finally(attributes)));
    };
}

let LazyLoadImageDirective = class LazyLoadImageDirective {
    constructor(el, ngZone, platformId, options) {
        this.platformId = platformId;
        this.onLoad = new EventEmitter(); // Callback when an image is loaded
        this.elementRef = el;
        this.ngZone = ngZone;
        this.propertyChanges$ = new ReplaySubject();
        this.hooks = cretateHooks(options);
    }
    ngOnChanges() {
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
    }
    ngAfterContentInit() {
        // Disable lazy load image in server side
        if (isPlatformServer(this.platformId)) {
            return null;
        }
        this.ngZone.runOutsideAngular(() => {
            this.scrollSubscription = this.propertyChanges$
                .pipe(tap(attributes => this.hooks.setup(attributes)), switchMap(attributes => this.hooks.getObservable(attributes).pipe(lazyLoadImage(this.hooks, attributes))))
                .subscribe(success => this.onLoad.emit(success));
        });
    }
    ngOnDestroy() {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }
};
__decorate([
    Input('lazyLoad'),
    __metadata("design:type", String)
], LazyLoadImageDirective.prototype, "lazyImage", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], LazyLoadImageDirective.prototype, "defaultImage", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], LazyLoadImageDirective.prototype, "errorImage", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
__decorate([
    Input(),
    __metadata("design:type", Observable)
], LazyLoadImageDirective.prototype, "scrollObservable", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], LazyLoadImageDirective.prototype, "offset", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], LazyLoadImageDirective.prototype, "useSrcset", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LazyLoadImageDirective.prototype, "onLoad", void 0);
LazyLoadImageDirective = __decorate([
    Directive({
        selector: '[lazyLoad]'
    }),
    __param(2, Inject(PLATFORM_ID)), __param(3, Optional()), __param(3, Inject('options')),
    __metadata("design:paramtypes", [ElementRef, NgZone, Object, Object])
], LazyLoadImageDirective);

var LazyLoadImageModule_1;
let LazyLoadImageModule = LazyLoadImageModule_1 = class LazyLoadImageModule {
    static forRoot(options) {
        return {
            ngModule: LazyLoadImageModule_1,
            providers: [{ provide: 'options', useValue: options }]
        };
    }
};
LazyLoadImageModule = LazyLoadImageModule_1 = __decorate([
    NgModule({
        declarations: [LazyLoadImageDirective],
        exports: [LazyLoadImageDirective]
    })
], LazyLoadImageModule);

const observers = new WeakMap();
const intersectionSubject = new Subject();
function loadingCallback(entrys) {
    entrys.forEach(entry => intersectionSubject.next(entry));
}
const getIntersectionObserver = (attributes) => {
    if (!attributes.scrollContainer && !isWindowDefined()) {
        return empty();
    }
    const options = {
        root: attributes.scrollContainer
    };
    if (attributes.offset) {
        options.rootMargin = `${attributes.offset}px`;
    }
    const scrollContainer = attributes.scrollContainer || window;
    let observer = observers.get(scrollContainer);
    if (!observer) {
        observer = new IntersectionObserver(loadingCallback, options);
        observers.set(scrollContainer, observer);
    }
    observer.observe(attributes.element);
    return Observable.create((obs) => {
        const subscription = intersectionSubject.pipe(filter(entry => entry.target === attributes.element)).subscribe(obs);
        return () => {
            subscription.unsubscribe();
            observer.unobserve(attributes.element);
        };
    });
};

const isVisible$1 = ({ event }) => {
    return event.isIntersecting;
};
const getObservable$1 = (attributes, _getInterObserver = getIntersectionObserver) => {
    if (attributes.scrollObservable) {
        return attributes.scrollObservable;
    }
    return _getInterObserver(attributes);
};
const intersectionObserverPreset = Object.assign({}, sharedPreset, {
    isVisible: isVisible$1,
    getObservable: getObservable$1
});

export { LazyLoadImageDirective, LazyLoadImageModule, intersectionObserverPreset, scrollPreset };
//# sourceMappingURL=ng-lazyload-image.js.map
