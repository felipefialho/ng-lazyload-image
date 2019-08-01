import { Observable } from 'rxjs';
import { cssClassNames, hasCssClassName, removeCssClassName, addCssClassName, isImageElement, isChildOfPicture, setSourcesToLazy, setImage, setImageAndSourcesToError, setImageAndSourcesToLazy, setImageAndSourcesToDefault } from '../util';
const end = ({ element }) => addCssClassName(element, cssClassNames.loaded);
const ɵ0 = end;
export const loadImage = ({ element, useSrcset, imagePath }) => {
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
const ɵ1 = setErrorImage;
const setLoadedImage = ({ element, imagePath, useSrcset }) => {
    setImageAndSourcesToLazy(element, imagePath, useSrcset);
};
const ɵ2 = setLoadedImage;
const setup = ({ element, defaultImagePath, useSrcset }) => {
    setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
    if (hasCssClassName(element, cssClassNames.loaded)) {
        removeCssClassName(element, cssClassNames.loaded);
    }
};
const ɵ3 = setup;
export const sharedPreset = {
    finally: end,
    loadImage,
    setErrorImage,
    setLoadedImage,
    setup
};
export { ɵ0, ɵ1, ɵ2, ɵ3 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbGF6eWxvYWQtaW1hZ2UvIiwic291cmNlcyI6WyJzcmMvc2hhcmVkLXByZXNldC9wcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBVyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLGNBQWMsRUFDZCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUix5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLDJCQUEyQixFQUM1QixNQUFNLFNBQVMsQ0FBQztBQUdqQixNQUFNLEdBQUcsR0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV2RixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDMUUsSUFBSSxHQUFxQixDQUFDO0lBQzFCLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxVQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBdUIsQ0FBQztRQUM5RSxHQUFHLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3JDO1NBQU07UUFDTCxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQzVDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztTQUMzQjtRQUNELElBQUksU0FBUyxFQUFFO1lBQ2IsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDeEI7YUFBTTtZQUNMLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1NBQ3JCO0tBQ0Y7SUFFRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUF5QixFQUFFLEVBQUU7UUFDckQsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QixRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDO1FBQ0YsR0FBRyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsRUFBRTtZQUNsQixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQW9CLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDaEYseUJBQXlCLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5RCxlQUFlLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7O0FBRUYsTUFBTSxjQUFjLEdBQXFCLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDN0Usd0JBQXdCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUM7O0FBRUYsTUFBTSxLQUFLLEdBQVksQ0FBQyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ2xFLDJCQUEyQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVsRSxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELGtCQUFrQixDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDbkQ7QUFDSCxDQUFDLENBQUM7O0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHO0lBQzFCLE9BQU8sRUFBRSxHQUFHO0lBQ1osU0FBUztJQUNULGFBQWE7SUFDYixjQUFjO0lBQ2QsS0FBSztDQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjc3NDbGFzc05hbWVzLFxuICBoYXNDc3NDbGFzc05hbWUsXG4gIHJlbW92ZUNzc0NsYXNzTmFtZSxcbiAgYWRkQ3NzQ2xhc3NOYW1lLFxuICBpc0ltYWdlRWxlbWVudCxcbiAgaXNDaGlsZE9mUGljdHVyZSxcbiAgc2V0U291cmNlc1RvTGF6eSxcbiAgc2V0SW1hZ2UsXG4gIHNldEltYWdlQW5kU291cmNlc1RvRXJyb3IsXG4gIHNldEltYWdlQW5kU291cmNlc1RvTGF6eSxcbiAgc2V0SW1hZ2VBbmRTb3VyY2VzVG9EZWZhdWx0XG59IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHsgRmluYWxseUZuLCBMb2FkSW1hZ2VGbiwgU2V0RXJyb3JJbWFnZUZuLCBTZXRMb2FkZWRJbWFnZUZuLCBTZXR1cEZuIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5jb25zdCBlbmQ6IEZpbmFsbHlGbiA9ICh7IGVsZW1lbnQgfSkgPT4gYWRkQ3NzQ2xhc3NOYW1lKGVsZW1lbnQsIGNzc0NsYXNzTmFtZXMubG9hZGVkKTtcblxuZXhwb3J0IGNvbnN0IGxvYWRJbWFnZTogTG9hZEltYWdlRm4gPSAoeyBlbGVtZW50LCB1c2VTcmNzZXQsIGltYWdlUGF0aCB9KSA9PiB7XG4gIGxldCBpbWc6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIGlmIChpc0ltYWdlRWxlbWVudChlbGVtZW50KSAmJiBpc0NoaWxkT2ZQaWN0dXJlKGVsZW1lbnQpKSB7XG4gICAgY29uc3QgcGFyZW50Q2xvbmUgPSBlbGVtZW50LnBhcmVudE5vZGUhLmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MUGljdHVyZUVsZW1lbnQ7XG4gICAgaW1nID0gcGFyZW50Q2xvbmUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xuICAgIHNldFNvdXJjZXNUb0xhenkoaW1nKTtcbiAgICBzZXRJbWFnZShpbWcsIGltYWdlUGF0aCwgdXNlU3Jjc2V0KTtcbiAgfSBlbHNlIHtcbiAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpZiAoaXNJbWFnZUVsZW1lbnQoZWxlbWVudCkgJiYgZWxlbWVudC5zaXplcykge1xuICAgICAgaW1nLnNpemVzID0gZWxlbWVudC5zaXplcztcbiAgICB9XG4gICAgaWYgKHVzZVNyY3NldCkge1xuICAgICAgaW1nLnNyY3NldCA9IGltYWdlUGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgaW1nLnNyYyA9IGltYWdlUGF0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBTdWJqZWN0PHN0cmluZz4pID0+IHtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgb2JzZXJ2ZXIubmV4dChpbWFnZVBhdGgpO1xuICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9O1xuICAgIGltZy5vbmVycm9yID0gZXJyID0+IHtcbiAgICAgIG9ic2VydmVyLmVycm9yKG51bGwpO1xuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3Qgc2V0RXJyb3JJbWFnZTogU2V0RXJyb3JJbWFnZUZuID0gKHsgZWxlbWVudCwgZXJyb3JJbWFnZVBhdGgsIHVzZVNyY3NldCB9KSA9PiB7XG4gIHNldEltYWdlQW5kU291cmNlc1RvRXJyb3IoZWxlbWVudCwgZXJyb3JJbWFnZVBhdGgsIHVzZVNyY3NldCk7XG4gIGFkZENzc0NsYXNzTmFtZShlbGVtZW50LCBjc3NDbGFzc05hbWVzLmZhaWxlZCk7XG59O1xuXG5jb25zdCBzZXRMb2FkZWRJbWFnZTogU2V0TG9hZGVkSW1hZ2VGbiA9ICh7IGVsZW1lbnQsIGltYWdlUGF0aCwgdXNlU3Jjc2V0IH0pID0+IHtcbiAgc2V0SW1hZ2VBbmRTb3VyY2VzVG9MYXp5KGVsZW1lbnQsIGltYWdlUGF0aCwgdXNlU3Jjc2V0KTtcbn07XG5cbmNvbnN0IHNldHVwOiBTZXR1cEZuID0gKHsgZWxlbWVudCwgZGVmYXVsdEltYWdlUGF0aCwgdXNlU3Jjc2V0IH0pID0+IHtcbiAgc2V0SW1hZ2VBbmRTb3VyY2VzVG9EZWZhdWx0KGVsZW1lbnQsIGRlZmF1bHRJbWFnZVBhdGgsIHVzZVNyY3NldCk7XG5cbiAgaWYgKGhhc0Nzc0NsYXNzTmFtZShlbGVtZW50LCBjc3NDbGFzc05hbWVzLmxvYWRlZCkpIHtcbiAgICByZW1vdmVDc3NDbGFzc05hbWUoZWxlbWVudCwgY3NzQ2xhc3NOYW1lcy5sb2FkZWQpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2hhcmVkUHJlc2V0ID0ge1xuICBmaW5hbGx5OiBlbmQsXG4gIGxvYWRJbWFnZSxcbiAgc2V0RXJyb3JJbWFnZSxcbiAgc2V0TG9hZGVkSW1hZ2UsXG4gIHNldHVwXG59O1xuIl19