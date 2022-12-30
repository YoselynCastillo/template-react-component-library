export const supportsScrollBehavior = (scroller) => {
    return window.getComputedStyle(scroller).overscrollBehavior;
};

// We used to rely on scrollBehavior as our way of determining if the browser can use animScroll correctly
// If scrollBehavior was supported, we had to disable scroll-snap before the animation, and re-enable it after
// Safari (and apparently Chromium 88) now supports scrollBehavior, but disabling snap causes it to snap to the beginning
// The property we now use is called overscrollBehavior
// overscrollBehavior is not supported by Safari, which is what we want b/c animScroll works fine without disabling scroll-snap
