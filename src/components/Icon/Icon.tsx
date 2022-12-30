import React from "react";
import FeaturesAndSpecs from "./../../icons/featuresAndSpecs";
import AddFavoritesMenu from "./../../icons/addFavoritesMenu";
import Compare from "./../../icons/compare";
import Share from "./../../icons/share";
import Hide from "./../../icons/hide";
import SaveCarButton from "./../../icons/saveCarButton";
import SingleOwnerIcon from "./../../icons/CarouselBadges/single-owner-icon";
import NewTireIcon from "./../../icons/CarouselBadges/new-tire-icon";
import LowMilesIcon from "./../../icons/CarouselBadges/low-miles-icon";
import FuelEfficientIcon from "./../../icons/CarouselBadges/fuel-efficient-icon";
import AdvancedFeaturesIcon from "./../../icons/CarouselBadges/advanced-features-icon";
import PremiumAudioIcon from "./../../icons/CarouselBadges/premium-audio-icon";

export interface IconProps {
  iconName: string;
}

const Icon = ({ iconName }: IconProps) => {
  switch (iconName) {
    case "addFavoritesMenu":
      return <AddFavoritesMenu />;
      break;
    case "compare":
      return <Compare />;
      break;
    case "share":
      return <Share />;
      break;
    case "featuresAndSpecs":
      return <FeaturesAndSpecs />;
      break;
    case "hide":
      return <Hide />;
      break;
    case "saveCarButton":
      return <SaveCarButton />;
      break;
    case "singleOwnerIcon":
      return <SingleOwnerIcon />;
      break;
    case "newTireIcon":
      return <NewTireIcon />;
      break;
    case "lowMilesIcon":
      return <LowMilesIcon />;
      break;
    case "fuelEfficientIcon":
      return <FuelEfficientIcon />;
      break;
    case "advancedFeaturesIcon":
      return <AdvancedFeaturesIcon />;
      break;
    case "premiumAudioIcon":
      return <PremiumAudioIcon />;
      break;

    default:
      return <></>;
      break;
  }
};

export default Icon;
