import { startWith } from 'rxjs/operators';
import { sharedPreset } from '../shared-preset/preset';
import { isWindowDefined } from '../util';
import { Rect } from './rect';
import { getScrollListener } from './scroll-listener';
export const isVisible = ({ element, offset, scrollContainer }, getWindow = () => window) => {
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
const ɵ0 = getObservable;
export const scrollPreset = Object.assign({}, sharedPreset, {
    isVisible,
    getObservable
});
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbGF6eWxvYWQtaW1hZ2UvIiwic291cmNlcyI6WyJzcmMvc2Nyb2xsLXByZXNldC9wcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFnQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxlQUFlLEVBQUUsRUFBRSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7SUFDdkgsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxJQUFJLGFBQWEsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ2hDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDbEQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5QixJQUFJLGVBQWUsRUFBRTtRQUNuQixNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDaEUsTUFBTSxZQUFZLEdBQUcscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0UsT0FBTyxhQUFhLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDTCxPQUFPLGFBQWEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBb0MsQ0FBQyxVQUFzQixFQUFFLEVBQUU7SUFDaEYsSUFBSSxVQUFVLENBQUMsZ0JBQWdCLEVBQUU7UUFDL0IsT0FBTyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsSUFBSSxVQUFVLENBQUMsZUFBZSxFQUFFO1FBQzlCLE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3REO0lBQ0QsT0FBTyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuRSxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUE0QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUU7SUFDbkYsU0FBUztJQUNULGFBQWE7Q0FDZCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBzaGFyZWRQcmVzZXQgfSBmcm9tICcuLi9zaGFyZWQtcHJlc2V0L3ByZXNldCc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzLCBHZXRPYnNlcnZhYmxlRm4sIEhvb2tTZXQsIElzVmlzaWJsZUZuIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgaXNXaW5kb3dEZWZpbmVkIH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgeyBSZWN0IH0gZnJvbSAnLi9yZWN0JztcbmltcG9ydCB7IGdldFNjcm9sbExpc3RlbmVyIH0gZnJvbSAnLi9zY3JvbGwtbGlzdGVuZXInO1xuXG5leHBvcnQgY29uc3QgaXNWaXNpYmxlOiBJc1Zpc2libGVGbjxFdmVudCB8IHN0cmluZz4gPSAoeyBlbGVtZW50LCBvZmZzZXQsIHNjcm9sbENvbnRhaW5lciB9LCBnZXRXaW5kb3cgPSAoKSA9PiB3aW5kb3cpID0+IHtcbiAgY29uc3QgZWxlbWVudEJvdW5kcyA9IFJlY3QuZnJvbUVsZW1lbnQoZWxlbWVudCk7XG4gIGlmIChlbGVtZW50Qm91bmRzID09PSBSZWN0LmVtcHR5KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHdpbmRvd0JvdW5kcyA9IFJlY3QuZnJvbVdpbmRvdyhnZXRXaW5kb3coKSk7XG4gIGVsZW1lbnRCb3VuZHMuaW5mbGF0ZShvZmZzZXQpO1xuXG4gIGlmIChzY3JvbGxDb250YWluZXIpIHtcbiAgICBjb25zdCBzY3JvbGxDb250YWluZXJCb3VuZHMgPSBSZWN0LmZyb21FbGVtZW50KHNjcm9sbENvbnRhaW5lcik7XG4gICAgY29uc3QgaW50ZXJzZWN0aW9uID0gc2Nyb2xsQ29udGFpbmVyQm91bmRzLmdldEludGVyc2VjdGlvbldpdGgod2luZG93Qm91bmRzKTtcbiAgICByZXR1cm4gZWxlbWVudEJvdW5kcy5pbnRlcnNlY3RzV2l0aChpbnRlcnNlY3Rpb24pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50Qm91bmRzLmludGVyc2VjdHNXaXRoKHdpbmRvd0JvdW5kcyk7XG4gIH1cbn07XG5cbmNvbnN0IGdldE9ic2VydmFibGU6IEdldE9ic2VydmFibGVGbjxFdmVudCB8IHN0cmluZz4gPSAoYXR0cmlidXRlczogQXR0cmlidXRlcykgPT4ge1xuICBpZiAoYXR0cmlidXRlcy5zY3JvbGxPYnNlcnZhYmxlKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZXMuc2Nyb2xsT2JzZXJ2YWJsZS5waXBlKHN0YXJ0V2l0aCgnJykpO1xuICB9XG4gIGlmIChhdHRyaWJ1dGVzLnNjcm9sbENvbnRhaW5lcikge1xuICAgIHJldHVybiBnZXRTY3JvbGxMaXN0ZW5lcihhdHRyaWJ1dGVzLnNjcm9sbENvbnRhaW5lcik7XG4gIH1cbiAgcmV0dXJuIGdldFNjcm9sbExpc3RlbmVyKGlzV2luZG93RGVmaW5lZCgpID8gd2luZG93IDogdW5kZWZpbmVkKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzY3JvbGxQcmVzZXQ6IEhvb2tTZXQ8RXZlbnQgfCBzdHJpbmc+ID0gT2JqZWN0LmFzc2lnbih7fSwgc2hhcmVkUHJlc2V0LCB7XG4gIGlzVmlzaWJsZSxcbiAgZ2V0T2JzZXJ2YWJsZVxufSk7XG4iXX0=