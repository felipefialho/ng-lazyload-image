import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, take, tap } from 'rxjs/operators';
export function lazyLoadImage(hookSet, attributes) {
    return function (scrollObservable) {
        return scrollObservable.pipe(filter(function (event) {
            return hookSet.isVisible({
                element: attributes.element,
                event: event,
                offset: attributes.offset,
                scrollContainer: attributes.scrollContainer
            });
        }), take(1), mergeMap(function () { return hookSet.loadImage(attributes); }), tap(function (imagePath) {
            return hookSet.setLoadedImage({
                element: attributes.element,
                imagePath: imagePath,
                useSrcset: attributes.useSrcset
            });
        }), map(function () { return true; }), catchError(function () {
            hookSet.setErrorImage(attributes);
            return of(false);
        }), tap(function () { return hookSet.finally(attributes); }));
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eWxvYWQtaW1hZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1sYXp5bG9hZC1pbWFnZS8iLCJzb3VyY2VzIjpbInNyYy9sYXp5bG9hZC1pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlFLE1BQU0sVUFBVSxhQUFhLENBQUksT0FBbUIsRUFBRSxVQUFzQjtJQUMxRSxPQUFPLFVBQUMsZ0JBQStCO1FBQ3JDLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUMxQixNQUFNLENBQUMsVUFBQSxLQUFLO1lBQ1YsT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDO2dCQUNoQixPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU87Z0JBQzNCLEtBQUssRUFBRSxLQUFLO2dCQUNaLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtnQkFDekIsZUFBZSxFQUFFLFVBQVUsQ0FBQyxlQUFlO2FBQzVDLENBQUM7UUFMRixDQUtFLENBQ0gsRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsUUFBUSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUE3QixDQUE2QixDQUFDLEVBQzdDLEdBQUcsQ0FBQyxVQUFBLFNBQVM7WUFDWCxPQUFBLE9BQU8sQ0FBQyxjQUFjLENBQUM7Z0JBQ3JCLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDM0IsU0FBUyxXQUFBO2dCQUNULFNBQVMsRUFBRSxVQUFVLENBQUMsU0FBUzthQUNoQyxDQUFDO1FBSkYsQ0FJRSxDQUNILEVBQ0QsR0FBRyxDQUFDLGNBQU0sT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDLEVBQ2YsVUFBVSxDQUFDO1lBQ1QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FDdkMsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIG1lcmdlTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBdHRyaWJ1dGVzLCBIb29rU2V0IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXp5TG9hZEltYWdlPEU+KGhvb2tTZXQ6IEhvb2tTZXQ8RT4sIGF0dHJpYnV0ZXM6IEF0dHJpYnV0ZXMpIHtcbiAgcmV0dXJuIChzY3JvbGxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPEU+KSA9PiB7XG4gICAgcmV0dXJuIHNjcm9sbE9ic2VydmFibGUucGlwZShcbiAgICAgIGZpbHRlcihldmVudCA9PlxuICAgICAgICBob29rU2V0LmlzVmlzaWJsZSh7XG4gICAgICAgICAgZWxlbWVudDogYXR0cmlidXRlcy5lbGVtZW50LFxuICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICBvZmZzZXQ6IGF0dHJpYnV0ZXMub2Zmc2V0LFxuICAgICAgICAgIHNjcm9sbENvbnRhaW5lcjogYXR0cmlidXRlcy5zY3JvbGxDb250YWluZXJcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWVyZ2VNYXAoKCkgPT4gaG9va1NldC5sb2FkSW1hZ2UoYXR0cmlidXRlcykpLFxuICAgICAgdGFwKGltYWdlUGF0aCA9PlxuICAgICAgICBob29rU2V0LnNldExvYWRlZEltYWdlKHtcbiAgICAgICAgICBlbGVtZW50OiBhdHRyaWJ1dGVzLmVsZW1lbnQsXG4gICAgICAgICAgaW1hZ2VQYXRoLFxuICAgICAgICAgIHVzZVNyY3NldDogYXR0cmlidXRlcy51c2VTcmNzZXRcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBtYXAoKCkgPT4gdHJ1ZSksXG4gICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgaG9va1NldC5zZXRFcnJvckltYWdlKGF0dHJpYnV0ZXMpO1xuICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgICAgfSksXG4gICAgICB0YXAoKCkgPT4gaG9va1NldC5maW5hbGx5KGF0dHJpYnV0ZXMpKVxuICAgICk7XG4gIH07XG59XG4iXX0=