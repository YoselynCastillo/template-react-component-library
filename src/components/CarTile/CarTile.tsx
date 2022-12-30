import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { CarTileType } from "./CarTileType";
import { gsap } from "gsap";
import "./CarTile.scss";
import CarTileActionMenu from "../CarTileActionMenu";
import {
  FbsTerms,
  MakeModelInfo,
  PriceMilesInfo,
  StoreTransferInfo,
  ImageCarousel,
  Ribbon,
  SaveCarButton,
} from "./subcomponents";
import { animHoverOff, animHoverOn } from "./CarTileAnimation";

const CarTile = ({
  stockNumber,
  year,
  make,
  model,
  trim,
  basePrice,
  mileage,
  stateCode,
  imageCount,
  highlights,
  isComingSoon,
  exteriorColor,
  position,
  postLoad = true,
  showFavorites,
  viewed,
  isFavorite,
  isDisabled,
  onUnfavorite,
  onFavorite,
  recommendationType,
  getCarImages,
  disableScrollNav,
  menuProps,
  criticalItem,
  fbsDecision,
  transferText,
  children,
  isNew,
  msrp,
  feesList,
  ribbonText,
  ribbonStyle,
  onMenuOpen,
  imageUrl,
}: CarTileType) => {
  const thisTile = useRef<HTMLElement>(null);
  const carouselNav = useRef<any>();
  const masterAnimController = useRef<any>();

  const hasImages = useMemo(() => imageCount && imageCount > 0, [imageCount]);
  const url = useMemo(
    () => (!isDisabled ? `/car/${stockNumber}` : undefined),
    [stockNumber]
  );

  const hasMakeModelInfo = year && make && model;
  const hasPriceMilesInfo = stockNumber && basePrice && mileage;
  const hasStoreTransferInfo = transferText;

  const getVehicleData = {
    basePrice,
    stockNumber,
    year,
    make,
    model,
    trim,
    stateCode,
    isNew,
    msrp,
    feesList,
    isDisabled,
  };

  useEffect(() => {
    masterAnimController.current = gsap.timeline({ paused: true });
    if (thisTile.current) {
      carouselNav.current = thisTile.current.querySelectorAll(
        ".sc--image-carousel--nav"
      );
    }
  }, [postLoad]);

  const hoverOn = useCallback(
    ({ pointerType }: any) => {
      if (
        postLoad &&
        hasImages &&
        !disableScrollNav &&
        pointerType === "mouse"
      ) {
        masterAnimController.current
          ?.clear()
          .add(animHoverOn(carouselNav.current))
          .play(0);
      }
    },
    [postLoad, hasImages, disableScrollNav]
  );

  const hoverOff = useCallback(
    ({ pointerType }: any, force = false) => {
      if (
        postLoad &&
        hasImages &&
        !disableScrollNav &&
        (pointerType === "mouse" || force)
      ) {
        masterAnimController.current
          ?.clear()
          .add(animHoverOff(carouselNav.current))
          .play(0);
      }
    },
    [postLoad, hasImages, disableScrollNav]
  );

  return (
    <article
      className={`sc--car-tile ${isDisabled && "disabled"}`}
      role="article"
      onPointerEnter={!isDisabled ? hoverOn : undefined}
      onPointerLeave={!isDisabled ? hoverOff : undefined}
      ref={thisTile}
      key={stockNumber}
      data-clickprops={`Element type: Car Tile,StockNumber: ${stockNumber},YMM: ${year} ${make} ${model},Price: ${basePrice},Coming Soon: ${isComingSoon}`}
      data-position={position}
      data-id={stockNumber}
      data-ignore-anchor-tag-rule
      data-recommendation={recommendationType}
    >
      <div className={`sc--tile-shell ${viewed ? "popover-open" : ""}`}>
        <div className="sc--car-tile--images">
          {ribbonText && (
            <Ribbon content={{ text: ribbonText }} ribbonStyle={ribbonStyle} />
          )}
          {showFavorites && onFavorite && (
            <SaveCarButton
              stockNumber={stockNumber}
              isFavorite={isFavorite}
              onFavorite={onFavorite}
              onUnfavorite={onUnfavorite}
            />
          )}

          <ImageCarousel
            stockNumber={stockNumber}
            badges={highlights}
            hasImages={hasImages}
            postLoad={postLoad}
            imageAltText={`${exteriorColor} ${year} ${make} ${model} with stock number: ${stockNumber}`}
            imageUrl={imageUrl} //url por confirmar
            viewMoreHref={url} //url por confirmar
            getCarImages={getCarImages}
            imageSize={400}
            imageApiUri={url}  //url por confirmar
          />
        </div>
        <div className="sc--car-tile--content">
          {menuProps && criticalItem && (
            <CarTileActionMenu
              menuProps={menuProps}
              criticalItem={criticalItem}
              // stockNumber={stockNumber}
              onMenuOpen={onMenuOpen}
            />
          )}
          {menuProps && !criticalItem && (
            <CarTileActionMenu
              menuProps={menuProps}
              // stockNumber={stockNumber}
              onMenuOpen={onMenuOpen}
            />
          )}
          {hasMakeModelInfo && (
            <MakeModelInfo
              href={url}
              year={year}
              make={make}
              model={model}
              trim={trim}
            />
          )}
          {hasPriceMilesInfo && (
            <PriceMilesInfo
              stockNumber={stockNumber}
              basePrice={basePrice}
              mileage={mileage}
            />
          )}
          {hasStoreTransferInfo && (
            <>
              {!fbsDecision && <hr />}
              <StoreTransferInfo transferText={transferText} />
            </>
          )}
          {/* {fbsDecision && (
            <>
              <hr />
              <FbsTerms
                fbsDecision={fbsDecision}
                vehicleData={getVehicleData}
              />
            </>
          )} */}
          {children}
        </div>
      </div>
    </article>
  );
};

export default memo(CarTile);
