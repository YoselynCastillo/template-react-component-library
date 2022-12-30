import React from "react";
import { memo } from "react";
import CarouselItem from "../CarouselItem/CarouselItem";
import { ICarouselImage } from "../types";
import "./CarouselImage.scss";

const CarouselImage = ({
  href,
  src,
  className,
  children,
  ...rest
}: ICarouselImage) => {
  const img = (
    <img src={src} {...rest} width="800" height="600" tabIndex={-1} />
  );
  return (
    <CarouselItem className={className}>
      {src &&
        (href ? (
          <a href={href} tabIndex={-1} rel="nofollow">
            {img}
          </a>
        ) : (
          img
        ))}
      {children}
    </CarouselItem>
  );
};

export default memo(CarouselImage);
