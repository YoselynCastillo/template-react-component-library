import { memo, useMemo } from "react";
import classnames from "classnames";
import CarouselItem from "../CarouselItem/CarouselItem";
import "./CarouselLoader.scss";
import CircularProgress from "../../../CircularProgress/CircularProgress";
import React from "react";

const CarouselLoader = ({ hasApiError, hasNoImagesError }: any) => {
  const hasError = useMemo(
    () => hasApiError || hasNoImagesError,
    [hasApiError, hasNoImagesError]
  );

  return (
    <CarouselItem
      className={classnames("sc--carousel-loader", {
        "sc--carousel-loader--has-error": hasError,
      })}
    >
      <div className="sc--carousel-loader--content">
        {/* {!hasError && <CircularProgress size="small" className={undefined} />} */}
        {hasApiError && (
          <>
            <h3>Whoops!</h3>
            <p>
              There was an error
              <br />
              retrieving the images.
            </p>
          </>
        )}
        {hasNoImagesError && (
          <>
            <h3>Sorry!</h3>
            <p>
              It appears there are
              <br />
              no additional images for this vehicle.
            </p>
          </>
        )}
      </div>
    </CarouselItem>
  );
};

export default memo(CarouselLoader);
