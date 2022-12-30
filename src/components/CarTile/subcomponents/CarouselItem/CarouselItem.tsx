import { memo } from "react";
import classnames from "classnames";
import "./CarouselItem.scss";
import { ICarouselItem } from "../types";
import React from "react";

const CarouselItem = ({ children: content, className }: ICarouselItem) => {
  return (
    <div className={classnames("sc--carousel-item", className)}>{content}</div>
  );
};

export default memo(CarouselItem);
