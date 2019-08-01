import { Observable } from 'rxjs';
import { Attributes, HookSet } from './types';
export declare function lazyLoadImage<E>(hookSet: HookSet<E>, attributes: Attributes): (scrollObservable: Observable<E>) => Observable<boolean>;
