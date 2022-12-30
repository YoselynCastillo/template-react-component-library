import { gsap } from 'gsap';

export const animHoverOn = (carouselArrows) => {
    return gsap
        .timeline()
        .set(carouselArrows, { pointerEvents: 'auto' })
        .fromTo(carouselArrows, { autoAlpha: 0 }, { duration: 0.5, autoAlpha: 1, ease: 'expo.out' }, 0.1)
        .fromTo(
            [carouselArrows[0].children, carouselArrows[1].children],
            { autoAlpha: 0, scale: 0.5, x: gsap.utils.wrap([25, -25]) },
            { duration: 0.65, autoAlpha: 1, scale: 1, x: gsap.utils.wrap([0, 0]), force3D: false, ease: 'expo.out' },
            0.1
        );
};

export const animHoverOff = (carouselArrows, heroImage) => {
    return gsap
        .timeline()
        .to(carouselArrows, { duration: 0.15, autoAlpha: 0 }, 0)
        .set([carouselArrows, carouselArrows[0].children, carouselArrows[1].children, heroImage], {
            clearProps: 'all',
            immediateRender: false,
        });
};
