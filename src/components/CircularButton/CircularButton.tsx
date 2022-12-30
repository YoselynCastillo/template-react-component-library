import React, { MouseEventHandler } from "react";
import "./CircularButton.scss";

/**
 * A Button that takes label text as a mandatory prop
 * and returns a React Button component.
 *
 * @param {string} className - additional class to be applied
 * @param {string} icon - `"dots" | "check"`
 * @param {object} styles - inline styles to be applied
 * @returns CircularButton
 */

export interface CircularButtonProps {
  className?: string;
  icon?: "dots" | "check";
  styles?: object;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CircularButton = (props: CircularButtonProps) => {
  const {
    className = "",
    icon = "dots",
    styles,
    onClick,
  } = props;
  return (
    <button
      type="button"
      aria-label="More actions"
      className={`car-tile-action action-menu ${className}`}
      onClick={onClick}
      style={styles}
    >
      {icon === "dots" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 19C10 17.8954 10.8954 17 12 17C13.1046 17 14 17.8954 14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3Z"
            fill="#565D65"
          />
        </svg>
      )}
      {icon === "check" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.7203 16.0455L4.4531 11.692L3 13.1641L8.7203 19L21 6.47204L19.5571 5L8.7203 16.0455Z"
            fill="#565D65"
          />
          <mask
            id="mask0_69_2205"
            maskUnits="userSpaceOnUse"
            x="3"
            y="5"
            width="18"
            height="14"
          >
            <path
              d="M8.7203 16.0455L4.4531 11.692L3 13.1641L8.7203 19L21 6.47204L19.5571 5L8.7203 16.0455Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_69_2205)"></g>
        </svg>
      )}
    </button>
  );
};

export default CircularButton;
