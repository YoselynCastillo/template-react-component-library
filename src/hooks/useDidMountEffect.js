import { useEffect, useRef } from 'react';

/**
 * Special version of `React.useEffect()` that will never fire on the initial render of a component.
 * @param {function} effect - Imperative function that can return a cleanup function
 * @param {any[]} deps - If present, effect will only activate if the values in the list change.
 */
export const useDidMountEffect = (effect, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            effect();
        } else {
            didMount.current = true;
        }
    }, deps);
};
