export declare class Rect {
    static empty: Rect;
    left: number;
    top: number;
    right: number;
    bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    static fromElement(element: HTMLElement): Rect;
    static fromWindow(_window: Window): Rect;
    inflate(inflateBy: number): void;
    intersectsWith(rect: Rect): boolean;
    getIntersectionWith(rect: Rect): Rect;
}
