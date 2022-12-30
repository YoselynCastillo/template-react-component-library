import React, { MouseEventHandler } from "react";
import { ActionMenuPopoverProps, MenuType } from "./menuTypes";
import "./CarTileActionMenu.scss";
import Icon from "../Icon";

const ActionMenuPopover = ({
  menuProps,
  onMenuClick,
  visible,
  criticalItem,
}: ActionMenuPopoverProps) => (
  <div className={`car-tile-action-menu-content ${visible && "visible"}`}>
    <ul>
      {menuProps.map((props, index) => {
        return (
          //   <li className={props.className} key={`menu-action-${index}`}>
          <li key={`menu-action-${index}`}>
            <button
              type="button"
              onClick={() => {
                props.onClick();
                onMenuClick && onMenuClick();
              }}
            >
              {props.icon && <Icon iconName={props.icon} />}
              {props.text}
            </button>
          </li>
        );
      })}
      {criticalItem && (
        <>
          <hr />
          <li
            className="critical-item"
            key={`menu-action-${criticalItem.text}`}
          >
            <button
              type="button"
              onClick={() => {
                criticalItem.onClick();
              }}
            >
              {criticalItem.icon && <Icon iconName={criticalItem.icon} />}
              {criticalItem.text}
            </button>
          </li>
        </>
      )}
    </ul>
  </div>
);

export default ActionMenuPopover;
