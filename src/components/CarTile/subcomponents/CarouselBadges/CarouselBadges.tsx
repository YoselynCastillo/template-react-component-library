import { memo, useCallback, useMemo } from "react";
import "./CarouselBadges.scss";
import CarouselItem from "../CarouselItem/CarouselItem";

import React from "react";
import Icon from "../../../Icon";

const CarouselBadges = ({ badges }: any) => {
  const badgeList = useMemo(() => {
    return badges
      .filter((badge: string) => badge !== "warranty")
      .filter((b: any, i: number) => i < 3);
  }, [badges]);

  const renderBadge = useCallback((badge: any) => {
    return (
      <div className="sc--badges--badge" key={badge}>
        {icons[badge].icon}
        <p className="kmx-typography--body-1">{icons[badge].message}</p>
      </div>
    );
  }, []);

  if (badgeList.length === 0) return null;

  return (
    <CarouselItem className="sc--badges">
      <div className="sc--badges--wrapper">
        {badgeList.map((badge: any) => renderBadge(badge))}
      </div>
    </CarouselItem>
  );
};

const icons:any = {
  singleOwner: {
    icon: <Icon iconName="singleOwnerIcon" />,
    message: "Single Owner",
  },
  allNewTires: {
    icon: <Icon iconName="newTireIcon" />,
    message: "All New Tires",
  },
  newPairTires: {
    icon: <Icon iconName="newTireIcon" />,
    message: "New Pair of Tires",
  },
  lowMiles: {
    icon: <Icon iconName="lowMilesIcon" />,
    message: "Low Miles",
  },
  lowMilesPerYear: {
    icon: <Icon iconName="lowMilesIcon" />,
    message: "Low Miles Per Year",
  },
  fuelEfficient: {
    icon: <Icon iconName="fuelEfficientIcon" />,
    message: "Fuel Efficient",
  },
  advancedFeatures: {
    icon: <Icon iconName="advancedFeaturesIcon" />,
    message: "Advanced Features",
  },
  premiumAudio: {
    icon: <Icon iconName="premiumAudioIcon" />,
    message: "Premium Audio",
  },
};

export default memo(CarouselBadges);
