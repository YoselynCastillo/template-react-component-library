import React from "react";
import { memo, useMemo } from "react";
import { IPriceMilesInfo } from "../types";

import "./PriceMilesInfo.scss";

const PriceMilesInfo = ({
  stockNumber,
  basePrice,
  msrp,
  isNew,
  mileage,
  root = "https://www.carmax.com",
}: IPriceMilesInfo) => {
  const formattedPrice = useMemo(() => {
    const price = isNew ? msrp : basePrice;
    return `${isNew ? "MSRP " : ""}${
      price ? `$${price.toLocaleString()}*` : "N/A"
    }`;
  }, [msrp, basePrice, isNew]);

  const formattedMileage = useMemo(() => {
    return `${Math.ceil(mileage / 1000)}K mi`;
  }, [mileage]);

  const seeCarMaxPrice = () => {
    const link = `${root}/new-car-price?stockNumber=${stockNumber}&op=Search_New_Price`;
    window.open(link, "_blank", "noopener");
  };

  return (
    <p className="sc--price-miles-info kmx-typography--body-3">
      <span>
        <span
          className={`sc--price-miles-info--price 
          ${isNew ? "sc--price-miles-info--new" : ""}`}
        >
          {formattedPrice}
        </span>
      </span>
      {isNew ? (
        <span
          className="sc--price-miles-info--see-carmax-price kmx-typography--headline-1"
          onClick={seeCarMaxPrice}
        >
          See CarMax Price
        </span>
      ) : (
        <>
          <span className="sc--price-miles-info--divider" />
          <span className="sc--price-miles-info--miles">
            {formattedMileage}
          </span>
        </>
      )}
    </p>
  );
};

export default memo(PriceMilesInfo);
