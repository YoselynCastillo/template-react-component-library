// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import MenuType from './menu.proptypes';
// import ActionMenuPopover from './ActionMenuPopover';
import { useComponentVisible } from "../../hooks";
// import { MouseEventHandler } from "react";
import "./CarTileActionMenu.scss";
import React from "react";
import CircularButton from "../CircularButton";
import { CircularButtonProps } from "../CircularButton/CircularButton";
import ActionMenuPopover from "./ActionMenuPopover";
import { menuPropsTest, criticalItemTest } from "./testData";
/**
 * A Button that takes label text as a mandatory prop
 * and returns a React Button component.
 *
 * @param {string} type - normal html button types - `"button" | "submit" | "reset"`
 * @param {string} btnType - `"primary" | "secondary" | "ghost"`
 * @param {string} className - additional class to be applied
 * @param {string} icon - default `dots`
 * @param {object} styles - inline styles to be applied
 * @param {CircularButtonProps} CircularButtonProps - inline styles to be applied
 * @returns CarTileActionMenu
 */

export interface CarTileActionMenuProps {
  menuProps?: any;
  onMenuOpen?: Function | undefined;
  criticalItem?: any;
  CircularButtonProps?: CircularButtonProps;
}

const CarTileActionMenu = ({
  menuProps,
  onMenuOpen,
  criticalItem,
  CircularButtonProps,
}: CarTileActionMenuProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const openMenu = () => {
    // console.debug("open");
    setIsComponentVisible(!isComponentVisible);
    // if (onMenuOpen && !isComponentVisible) onMenuOpen();
  };


  return (
    <div ref={ref}>
      <CircularButton icon={CircularButtonProps?.icon} onClick={openMenu} />
      <ActionMenuPopover
        menuProps={menuPropsTest}
        visible={isComponentVisible}
        criticalItem={criticalItemTest}
      />
    </div>
  );
};

export default CarTileActionMenu;
