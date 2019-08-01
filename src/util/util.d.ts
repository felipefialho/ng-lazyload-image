export declare function isWindowDefined(): boolean;
export declare function isChildOfPicture(element: HTMLImageElement | HTMLDivElement): boolean;
export declare function isImageElement(element: HTMLImageElement | HTMLDivElement): element is HTMLImageElement;
export declare function setImage(element: HTMLImageElement | HTMLDivElement, imagePath: string, useSrcset?: boolean): HTMLImageElement | HTMLDivElement;
export declare const setSourcesToLazy: (image: HTMLImageElement) => void;
export declare const setImageAndSourcesToDefault: (element: HTMLImageElement | HTMLDivElement, imagePath?: string, useSrcset?: boolean) => void;
export declare const setImageAndSourcesToLazy: (element: HTMLImageElement | HTMLDivElement, imagePath?: string, useSrcset?: boolean) => void;
export declare const setImageAndSourcesToError: (element: HTMLImageElement | HTMLDivElement, imagePath?: string, useSrcset?: boolean) => void;
