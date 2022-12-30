import classNames from "classnames";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import "./NeoButton.scss";
import CircularProgress from "../CircularProgress/CircularProgress";
import React from "react";

const NeoButton = forwardRef(
  (
    {
      children,
      className,
      href,
      disabled,
      level = "primary",
      isLoading = false,
      ...rest
    }: any,
    ref
  ) => {
    return href ? (
      <a
        className={classNames(
          "kmx-button",
          `kmx-button--${level}`,
          "sc--neo-button",
          `sc--neo-button--${level}`,
          className
        )}
        ref={ref}
        href={href}
        disabled={disabled}
        {...rest}
      >
        {children}
      </a>
    ) : (
      <button
        className={classNames(
          "kmx-button",
          `kmx-button--${level}`,
          "sc--neo-button",
          `sc--neo-button--${level}`,
          className
        )}
        ref={ref}
        level={level}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading ? ( <></>
          // <CircularProgress size="small" className={undefined} />
        ) : (
          children
        )}
      </button>
    );
  }
);

export default memo(NeoButton);

// NeoButton.propTypes = {
//   /** Children to be rendered within <button> or <a> tag */
//   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
//   /** Class name to be added to <button> or <a> tag */
//   className: PropTypes.string,
//   /** Href attribute for <a> tag */
//   href: PropTypes.string,
//   /** Disabled attribute for <button> tag */
//   disabled: PropTypes.bool,
//   /** Level for Legos class names (primary, secondary, tertiary, quaternary) */
//   level: PropTypes.oneOf(["primary", "secondary", "tertiary", "quaternary"]),
//   /** Displays CircularProgress component within button when true (and disables) */
//   isLoading: PropTypes.bool,
// };
