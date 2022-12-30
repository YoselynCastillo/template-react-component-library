import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import CarTile from "./../components/CarTile";
import {
  menuPropsTest,
  criticalItemTest,
} from "./../components/CarTileActionMenu/testData";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Carmax/CarTile",
  component: CarTile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CarTile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CarTile> = (args) => (
  <div style={{ maxWidth: 270 }}>
    <CarTile {...args} />
  </div>
);

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  menuProps: menuPropsTest,
  criticalItem: criticalItemTest,
};
export const NewMatch = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NewMatch.args = {
  stockNumber: 22266008,
  year: 2021,
  make: "Volvo",
  model: "XC40",
  trim: "T5 R-Design",
  basePrice: 52998,
  mileage: 122000,
  storeName: "Fredericksburg",
  stateCode: "VA",
  imageCount: 1,
  highlights: "",
  isComingSoon: false,
  exteriorColor: "White",
  position: "",
  imageUrl: "https://via.placeholder.com/400/808080%20/FFFFFF",
  postLoad: true,
  showFavorites: true,
  viewed: false,
  isFavorite: false,
  isDisabled: false,
  ribbonStyle: "standard",
  ribbonText: "New Match",
  onUnfavorite: () => {
    return null;
  },
  onFavorite: () => {
    return null;
  },
  recommendationType: "",
  getCarImages: () => {
    return null;
  },
  disableScrollNav: false,
  menuProps: menuPropsTest,
  criticalItem: criticalItemTest,
  transferText: "Available At CarMax West Broad, VA",
  fbsDecision: null,
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
