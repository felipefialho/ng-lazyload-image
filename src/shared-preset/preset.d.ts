import { FinallyFn, LoadImageFn, SetErrorImageFn, SetLoadedImageFn, SetupFn } from '../types';
export declare const loadImage: LoadImageFn;
export declare const sharedPreset: {
    finally: FinallyFn;
    loadImage: LoadImageFn;
    setErrorImage: SetErrorImageFn;
    setLoadedImage: SetLoadedImageFn;
    setup: SetupFn;
};
