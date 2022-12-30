import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { supportsScrollBehavior } from '../utilities/supportsScrollBehavior';

gsap.registerPlugin(ScrollToPlugin);

export const animScroll = (
    scroller,
    scrollPos,
    { direction = 'x', duration = 0.5, scrollComplete = () => {} } = {}
) => {
    const scrollTween = gsap
        .timeline()
        .to(scroller, { duration, scrollTo: { [direction]: scrollPos, autoKill: false }, ease: 'expo.inOut' })
        .call(scrollComplete);

    if (scroller !== window && supportsScrollBehavior(scroller)) {
        return gsap
            .timeline()
            .add(() => scroller.classList.add('disable-snap'))
            .add(scrollTween)
            .add(() => scroller.classList.remove('disable-snap'));
    }

    return scrollTween;
};
