import { AfterContentInit, ElementRef, EventEmitter, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleOptions } from './types';
export declare class LazyLoadImageDirective implements OnChanges, AfterContentInit, OnDestroy {
    private platformId;
    lazyImage: string;
    defaultImage?: string;
    errorImage?: string;
    scrollTarget?: any;
    scrollObservable?: Observable<any>;
    offset?: number;
    useSrcset?: boolean;
    onLoad: EventEmitter<boolean>;
    private propertyChanges$;
    private elementRef;
    private ngZone;
    private scrollSubscription?;
    private hooks;
    constructor(el: ElementRef, ngZone: NgZone, platformId: Object, options?: ModuleOptions);
    ngOnChanges(): void;
    ngAfterContentInit(): any;
    ngOnDestroy(): void;
}
