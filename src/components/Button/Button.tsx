import React from "react";
import "./Button.scss";

/**
 * A Button that takes label text as a mandatory prop
 * and returns a React Button component.
 *
 * @param {string} label - text to be displayed inside the button
 * @param {string} size - `"lg" | "md" | "sm"`
 * @param {string} type - normal html button types - `"button" | "submit" | "reset"`
 * @param {string} btnType - `"primary" | "secondary" | "ghost"`
 * @param {string} className - additional class to be applied
 * @param {string} shape - - "default" | "rounded" | "pill"
 * @param {object} styles - inline styles to be applied
 * @param {boolean} isDarkMode - default `false`
 * @returns Button
 */

export interface ButtonProps {
  label: string;
  size?: "lg" | "md" | "sm";
  btnType?: "primary" | "secondary" | "ghost";
  shape?: "default" | "rounded" | "pill";
  // onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string;
  styles?: object;
  type?: "button" | "submit" | "reset";
  isDarkMode?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    label,
    size = "md",
    type = "button",
    btnType = "primary",
    className,
    shape = "default",
    styles,
    isDarkMode = false,
  } = props;
  return (
    <button
      type={type}
      className={`button ${size} ${btnType} ${shape} ${
        isDarkMode === true && `dark`
      } ${className}`}
      style={styles}
    >
      {label}
    </button>
  );
};

export default Button;
