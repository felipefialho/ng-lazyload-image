import * as tslib_1 from "tslib";
import { Directive, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from "@angular/common";
import { ReplaySubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { cretateHooks } from './hooks-factory';
import { lazyLoadImage } from './lazyload-image';
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
tslib_1.__decorate([
    Input('lazyLoad'),
    tslib_1.__metadata("design:type", String)
], LazyLoadImageDirective.prototype, "lazyImage", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], LazyLoadImageDirective.prototype, "defaultImage", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], LazyLoadImageDirective.prototype, "errorImage", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Observable)
], LazyLoadImageDirective.prototype, "scrollObservable", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Number)
], LazyLoadImageDirective.prototype, "offset", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean)
], LazyLoadImageDirective.prototype, "useSrcset", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], LazyLoadImageDirective.prototype, "onLoad", void 0);
LazyLoadImageDirective = tslib_1.__decorate([
    Directive({
        selector: '[lazyLoad]'
    }),
    tslib_1.__param(2, Inject(PLATFORM_ID)), tslib_1.__param(3, Optional()), tslib_1.__param(3, Inject('options')),
    tslib_1.__metadata("design:paramtypes", [ElementRef, NgZone, Object, Object])
], LazyLoadImageDirective);
export { LazyLoadImageDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eWxvYWQtaW1hZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbGF6eWxvYWQtaW1hZ2UvIiwic291cmNlcyI6WyJzcmMvbGF6eWxvYWQtaW1hZ2UuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF3QixRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsSyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBTWpELElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXNCO0lBZWpDLFlBQVksRUFBYyxFQUFFLE1BQWMsRUFBK0IsVUFBa0IsRUFBaUMsT0FBdUI7UUFBMUUsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQVBqRixXQUFNLEdBQTBCLElBQUksWUFBWSxFQUFFLENBQUMsQ0FBQyxtQ0FBbUM7UUFRL0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7WUFDdEMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ25DLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNsQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIseUNBQXlDO1FBQ3pDLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjtpQkFDNUMsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQy9DLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQzFHO2lCQUNBLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN2QztJQUNILENBQUM7Q0FDRixDQUFBO0FBdkRvQjtJQUFsQixLQUFLLENBQUMsVUFBVSxDQUFDOzt5REFBb0I7QUFDN0I7SUFBUixLQUFLLEVBQUU7OzREQUF1QjtBQUN0QjtJQUFSLEtBQUssRUFBRTs7MERBQXFCO0FBQ3BCO0lBQVIsS0FBSyxFQUFFOzs0REFBb0I7QUFDbkI7SUFBUixLQUFLLEVBQUU7c0NBQW9CLFVBQVU7Z0VBQU07QUFDbkM7SUFBUixLQUFLLEVBQUU7O3NEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7eURBQXFCO0FBQ25CO0lBQVQsTUFBTSxFQUFFO3NDQUFTLFlBQVk7c0RBQStCO0FBUmxELHNCQUFzQjtJQUhsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtLQUN2QixDQUFDO0lBZ0I2QyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUEsRUFBOEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7NkNBQTNHLFVBQVUsRUFBVSxNQUFNLEVBQTJDLE1BQU07R0FmaEYsc0JBQXNCLENBd0RsQztTQXhEWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBJbnB1dCwgTmdab25lLCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsIE91dHB1dCwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBSZXBsYXlTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY3JldGF0ZUhvb2tzIH0gZnJvbSAnLi9ob29rcy1mYWN0b3J5JztcbmltcG9ydCB7IGxhenlMb2FkSW1hZ2UgfSBmcm9tICcuL2xhenlsb2FkLWltYWdlJztcbmltcG9ydCB7IEF0dHJpYnV0ZXMsIEhvb2tTZXQsIE1vZHVsZU9wdGlvbnMgfSBmcm9tICcuL3R5cGVzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xhenlMb2FkXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRJbWFnZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCdsYXp5TG9hZCcpIGxhenlJbWFnZSE6IHN0cmluZzsgLy8gVGhlIGltYWdlIHRvIGJlIGxhenkgbG9hZGVkXG4gIEBJbnB1dCgpIGRlZmF1bHRJbWFnZT86IHN0cmluZzsgLy8gVGhlIGltYWdlIHRvIGJlIGRpc3BsYXllZCBiZWZvcmUgbGF6eUltYWdlIGlzIGxvYWRlZFxuICBASW5wdXQoKSBlcnJvckltYWdlPzogc3RyaW5nOyAvLyBUaGUgaW1hZ2UgdG8gYmUgZGlzcGxheWVkIGlmIGxhenlJbWFnZSBsb2FkIGZhaWxzXG4gIEBJbnB1dCgpIHNjcm9sbFRhcmdldD86IGFueTsgLy8gU2Nyb2xsIGNvbnRhaW5lciB0aGF0IGNvbnRhaW5zIHRoZSBpbWFnZSBhbmQgZW1pdHMgc2NvbGwgZXZlbnRzXG4gIEBJbnB1dCgpIHNjcm9sbE9ic2VydmFibGU/OiBPYnNlcnZhYmxlPGFueT47IC8vIFBhc3MgeW91ciBvd24gc2Nyb2xsIGVtaXR0ZXJcbiAgQElucHV0KCkgb2Zmc2V0PzogbnVtYmVyOyAvLyBUaGUgbnVtYmVyIG9mIHB4IGEgaW1hZ2Ugc2hvdWxkIGJlIGxvYWRlZCBiZWZvcmUgaXQgaXMgaW4gdmlldyBwb3J0XG4gIEBJbnB1dCgpIHVzZVNyY3NldD86IGJvb2xlYW47IC8vIFdoZXRoZXIgc3Jjc2V0IGF0dHJpYnV0ZSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkIG9mIHNyY1xuICBAT3V0cHV0KCkgb25Mb2FkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7IC8vIENhbGxiYWNrIHdoZW4gYW4gaW1hZ2UgaXMgbG9hZGVkXG4gIHByaXZhdGUgcHJvcGVydHlDaGFuZ2VzJDogUmVwbGF5U3ViamVjdDxBdHRyaWJ1dGVzPjtcbiAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIG5nWm9uZTogTmdab25lO1xuICBwcml2YXRlIHNjcm9sbFN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBob29rczogSG9va1NldDxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCBuZ1pvbmU6IE5nWm9uZSwgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsIEBPcHRpb25hbCgpIEBJbmplY3QoJ29wdGlvbnMnKSBvcHRpb25zPzogTW9kdWxlT3B0aW9ucykge1xuICAgIHRoaXMuZWxlbWVudFJlZiA9IGVsO1xuICAgIHRoaXMubmdab25lID0gbmdab25lO1xuICAgIHRoaXMucHJvcGVydHlDaGFuZ2VzJCA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XG4gICAgdGhpcy5ob29rcyA9IGNyZXRhdGVIb29rcyhvcHRpb25zKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMucHJvcGVydHlDaGFuZ2VzJC5uZXh0KHtcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgaW1hZ2VQYXRoOiB0aGlzLmxhenlJbWFnZSxcbiAgICAgIGRlZmF1bHRJbWFnZVBhdGg6IHRoaXMuZGVmYXVsdEltYWdlLFxuICAgICAgZXJyb3JJbWFnZVBhdGg6IHRoaXMuZXJyb3JJbWFnZSxcbiAgICAgIHVzZVNyY3NldDogdGhpcy51c2VTcmNzZXQsXG4gICAgICBvZmZzZXQ6IHRoaXMub2Zmc2V0ID8gdGhpcy5vZmZzZXQgfCAwIDogMCxcbiAgICAgIHNjcm9sbENvbnRhaW5lcjogdGhpcy5zY3JvbGxUYXJnZXQsXG4gICAgICBzY3JvbGxPYnNlcnZhYmxlOiB0aGlzLnNjcm9sbE9ic2VydmFibGVcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAvLyBEaXNhYmxlIGxhenkgbG9hZCBpbWFnZSBpbiBzZXJ2ZXIgc2lkZVxuICAgIGlmIChpc1BsYXRmb3JtU2VydmVyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsU3Vic2NyaXB0aW9uID0gdGhpcy5wcm9wZXJ0eUNoYW5nZXMkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChhdHRyaWJ1dGVzID0+IHRoaXMuaG9va3Muc2V0dXAoYXR0cmlidXRlcykpLFxuICAgICAgICAgIHN3aXRjaE1hcChhdHRyaWJ1dGVzID0+IHRoaXMuaG9va3MuZ2V0T2JzZXJ2YWJsZShhdHRyaWJ1dGVzKS5waXBlKGxhenlMb2FkSW1hZ2UodGhpcy5ob29rcywgYXR0cmlidXRlcykpKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoc3VjY2VzcyA9PiB0aGlzLm9uTG9hZC5lbWl0KHN1Y2Nlc3MpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNjcm9sbFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zY3JvbGxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==