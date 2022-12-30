import { memo } from "react";
import classnames from "classnames";
import "./Ribbon.scss";
import React from "react";

const Ribbon = ({ content: { text, type }, className, ribbonStyle }: any) => {
  return (
    <div
      className={classnames(
        "sc--ribbon",
        "kmx-typography--body-1",
        `sc--ribbon--${type}`,
        `${ribbonStyle}`,
        className
      )}
    >
      {ribbonStyle == "checked" && <CheckmarkIcon />}
      {text}
    </div>
  );
};

const CheckmarkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
    >
      <path
        d="M3.81353 7.69691L0.968732 4.7946L0 5.77596L3.81353 9.66659L12 1.31461L11.0381 0.333252L3.81353 7.69691Z"
        fill="#2A343D"
      />
    </svg>
  );
};

export default memo(Ribbon);
