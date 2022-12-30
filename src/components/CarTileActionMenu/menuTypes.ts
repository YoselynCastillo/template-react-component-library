export interface MenuType {
  text: string;
  onClick: Function;
  icon: any;
}

export interface ActionMenuPopoverProps {
  menuProps: Array<MenuType>;
  onMenuOpen?: Function | undefined;
  visible?: boolean;
  criticalItem?: MenuType;
  onMenuClick?: Function;
}
