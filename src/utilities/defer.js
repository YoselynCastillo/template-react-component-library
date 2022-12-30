/** Alias for `setTimeout(fn, 0)` which is used to accomplish certain threading behavior in JavaScript. */
export const defer = (fn) => setTimeout(fn, 0);
