import { Observable } from 'rxjs';
export declare function sampleObservable<T>(obs: Observable<T>, scheduler?: any): Observable<T | ''>;
export declare const getScrollListener: (scrollTarget?: HTMLElement | Window) => Observable<"" | Event>;
