import  LeftArrow  from "./LeftArrow";
import  RightArrow from "./RightArrow";
import classnames from "classnames";
import { memo } from "react";
import "./CarouselNav.scss";
import { ICarouselNav } from "../types";
import React from "react";

const CarouselNav = ({
  direction,
  className,
  navInteraction,
}: ICarouselNav) => {
  return (
    <button
      type="button"
      aria-label={`${direction} arrow button`}
      className={classnames(
        "sc--image-carousel--nav",
        `sc--image-carousel--nav--${direction}`,
        className
      )}
      onClick={navInteraction}
      onKeyDown={navInteraction}
      data-clickprops={"Element type: Image Carousel Nav"}
      data-direction={direction}
    >
      {direction === "left" ? <LeftArrow /> : <RightArrow />}
    </button>
  );
};

export default memo(CarouselNav);
