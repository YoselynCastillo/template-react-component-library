import { useEffect, useRef } from 'react';
import classnames from 'classnames';
import './CircularProgress.scss';

const easing = 0.03;

const CircularProgress = ({ className, size = 'x-small' }) => {
    const circle = useRef();

    let animationFrame = null;
    let dashArray = [0, 150];
    let dashOffset = 150;
    let half = false;
    let speed = 1;

    useEffect(() => {
        animationFrame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const loop = () => {
        if (dashOffset <= 0) {
            half = true;

            if (dashOffset <= -300) {
                dashOffset = 150;
                dashArray = [0, 150];
                half = false;
            }
        }

        if (!half) {
            speed += easing;
            dashOffset -= speed;
            dashArray[0] += speed;
            dashArray[1] -= speed;
        } else {
            speed -= easing;
            dashOffset -= speed * 2;
            dashArray[0] -= speed;
            dashArray[1] += speed;
        }

        if (circle.current) {
            circle.current.style.strokeDashoffset = dashOffset.toString();
            circle.current.style.strokeDasharray = dashArray.join(' ');
        }

        animationFrame = requestAnimationFrame(loop);
    };

    return (
        <div
            className={classnames(
                'js-progress-circular-indeterminate',
                'kmx-progress-circular-indeterminate',
                `kmx-progress-circular-indeterminate-${size}`,
                className
            )}
            role="progressbar"
            aria-busy="true"
        >
            <span className="visually-hidden">loading</span>
            <svg viewBox="0 0 60 60" aria-hidden="true" focusable="false">
                <circle ref={circle} cx="30" cy="30" r="24" />
            </svg>
        </div>
    );
};

export default CircularProgress;
