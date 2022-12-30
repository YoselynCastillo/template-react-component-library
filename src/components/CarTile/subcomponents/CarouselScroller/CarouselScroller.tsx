import classNames from "classnames";
import React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animScroll } from "../../../../animations";
import { useDidMountEffect } from "../../../../hooks";
import { defer } from "../../../../utilities/defer";
import NeoButton from "../../../NeoButton/NeoButton";
import CarouselBadges from "../CarouselBadges/CarouselBadges";
import CarouselImage from "../CarouselImage/CarouselImage";
import CarouselLoader from "../CarouselLoader/CarouselLoader";
import CarouselNav from "../CarouselNav/CarouselNav";
import { ICarouselScroller } from "../types";
import "./CarouselScroller.scss";

const getDotElement = (carouselDots: any, index: any) =>
  carouselDots.children[index];

const getClosestDomIndex = (scroller: any) => {
  let currentIndex = 0;
  let shortestDistance = -1;
  [...scroller.children].forEach((t, i) => {
    const distanceFromScroll = Math.abs(scroller.scrollLeft - t.offsetLeft);
    if (shortestDistance === -1 || distanceFromScroll < shortestDistance) {
      shortestDistance = distanceFromScroll;
      currentIndex = i;
    }
  });

  return currentIndex;
};

const CarouselScroller = ({
  heroImage,
  carouselImages,
  badges,
  getAllImages,
  hasImages,
  hasApiError,
  hasNoImagesError,
  setNoImagesFromApi,
  resetError,
  imageAltText,
  postLoad = true,
  imageUrl,
  viewMoreHref,
}: ICarouselScroller) => {
  const [windowWidth, setWindowWidth] = useState<number>();

  const carouselScroll = useRef<HTMLDivElement>(null);
  const carouselDots = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const getImagesTimeout = useRef<any>();
  const updatesTimeout = useRef<any>();
  const isAnimating = useRef(false);
  const isGettingImages = useRef(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [leftNavDisabled, setLeftNavDisabled] = useState(true);
  const [rightNavDisabled, setRightNavDisabled] = useState(false);
  const [haveAllImages, setHaveAllImages] = useState(false);
  const [imageLoadCount, setImageLoadCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const [itemCount, setItemCount] = useState<number>(7);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const showDots = useMemo(
    () => hasImages && isTouchDevice,
    [hasImages, isTouchDevice]
  );

  const updateNavDisabledState = useCallback(() => {
    const { current: scroller } = carouselScroll;
    const newIndex = getClosestDomIndex(scroller);
    setLeftNavDisabled(scroller?.scrollLeft === 0);
    const scrollerChildren = scroller?.children[newIndex] as HTMLElement;
    setRightNavDisabled(
      scrollerChildren.offsetLeft +
        (scroller?.clientWidth ? scroller?.clientWidth : 0) ===
        scroller?.scrollWidth
    );
  }, []);

  const getScrollPos = useCallback(
    (direction = "right") => {
      const { current: scroller } = carouselScroll;
      const currIndex = getClosestDomIndex(scroller);
      const newIndex = direction === "right" ? currIndex + 1 : currIndex - 1;
      const scrollerChildren = scroller?.children[newIndex] as HTMLElement;
      return scrollerChildren?.offsetLeft ?? 0;
    },
    [haveAllImages]
  );

  const navScroll = useCallback(
    (direction = "right") => {
      const navDisabled =
        direction === "right" ? rightNavDisabled : leftNavDisabled;
      if (!navDisabled && !isAnimating.current) {
        if (setShouldScroll && selectedImage) {
          setShouldScroll(false);
        }
        isAnimating.current = true;
        const scrollPos = getScrollPos(direction);
        animScroll(carouselScroll.current, scrollPos, {
          scrollComplete: () => {
            isAnimating.current = false;
          },
        });
      }
    },
    [rightNavDisabled, leftNavDisabled, getScrollPos]
  );

  const handleResize = useCallback(() => {
    // note this will allow NextJS to use this component.
    if (typeof window !== "undefined" && windowWidth !== window.innerWidth) {
      setWindowWidth(window.innerWidth);

      if (carouselScroll.current && carouselScroll.current.scrollLeft > 0) {
        carouselScroll.current.scrollTo({ left: 0 });
      }
    }
  }, []);

  const handleDotUpdate = useCallback(() => {
    const { current: dots } = carouselDots;
    const currIndex = currentIndex.current;
    const newIndex = getClosestDomIndex(carouselScroll.current);
    if (newIndex !== currIndex) {
      const currentDot = getDotElement(dots, currIndex);
      const newDot = getDotElement(dots, newIndex);
      newDot.classList.add("sc--active-dot");
      currentDot.classList.remove("sc--active-dot");
      currentIndex.current = newIndex;
    }
  }, []);

  const handleCarouselScrolling = useCallback(() => {
    if (setShouldScroll && selectedImage) {
      setShouldScroll(false);
    }

    updatesTimeout.current && clearTimeout(updatesTimeout.current);
    if (updatesTimeout.current) {
      updatesTimeout.current = defer(() => {
        updateNavDisabledState();
        showDots && handleDotUpdate();
        setSelectedImage &&
          setSelectedImage(getClosestDomIndex(carouselScroll.current));
      });
    }

    if (!haveAllImages) {
      const { current: scroller } = carouselScroll;
      const scrollStarted = scroller!.scrollLeft > 0;
      const midScroll = scroller!.scrollLeft > scroller!.clientWidth / 2;

      if (scrollStarted && !showLoader) {
        setShowLoader(true);
      } else if (scroller?.scrollLeft === 0 && showLoader) {
        setShowLoader(false);
      }

      getImagesTimeout.current && clearTimeout(getImagesTimeout.current);
      getImagesTimeout.current = setTimeout(() => {
        if (midScroll && !isGettingImages.current) {
          isGettingImages.current = true;
          getAllImages();
        }
      }, 100);
    }
  }, [
    updateNavDisabledState,
    showDots,
    handleDotUpdate,
    haveAllImages,
    showLoader,
    getAllImages,
  ]);

  const handleNavInteraction = useCallback(
    (e: any) => {
      if (!e.key) e.preventDefault();
      if (!e.key || e.key === "Enter") {
        const direction = e.target.getAttribute("data-direction");
        navScroll(direction);
      }
    },
    [navScroll]
  );

  const carouselImageLoaded = useCallback(() => {
    setImageLoadCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (shouldScroll && carouselScroll.current) {
      if (!haveAllImages) {
        getAllImages();
        setTimeout(() => {
          const carouselChildren = carouselScroll.current?.children[
            selectedImage
          ] as HTMLElement;
          const selectedImagePosition = carouselChildren?.offsetLeft ?? 0;
          if (selectedImagePosition > 0 && carouselScroll.current) {
            carouselScroll.current.scrollTo({ left: selectedImagePosition });
          }
        }, 500);
      } else {
        const carouselChildren = carouselScroll.current?.children[
          selectedImage
        ] as HTMLElement;
        const selectedImagePosition = carouselChildren?.offsetLeft ?? 0;
        carouselScroll.current.scrollTo({ left: selectedImagePosition });
      }
    }
  }, [selectedImage, carouselScroll.current, shouldScroll]);

  const renderImages = useCallback(() => {
    if (haveAllImages) {
      return (
        <>
          {carouselImages.map(
            (image: { src: any; tag: any }, index: number) => {
              if (index > 0) {
                return (
                  <CarouselImage
                    src={image.src}
                    alt={image.tag}
                    onLoad={carouselImageLoaded}
                    key={image.src}
                    href={imageUrl}
                  />
                );
              }
              return null;
            }
          )}
          <CarouselBadges badges={badges} />
          <CarouselImage
            src={heroImage}
            className="sc--hero-image sc--view-more sc--loaded"
          >
            <div className="sc--view-more--button--container">
              <NeoButton
                className="sc--view-more--button"
                href={viewMoreHref}
                link={true}
                level="secondary"
              >
                View More
              </NeoButton>
            </div>
          </CarouselImage>
        </>
      );
    }
    return null;
  }, [
    haveAllImages,
    badges,
    carouselImages,
    carouselImageLoaded,
    heroImage,
    imageUrl,
    viewMoreHref,
  ]);

  useEffect(() => {
    hasApiError &&
      setTimeout(() => {
        animScroll(carouselScroll.current, 0, {
          scrollComplete: () => {
            resetError();
            isGettingImages.current = false;
          },
        });
      }, 1500);

    hasNoImagesError &&
      setTimeout(() => {
        animScroll(carouselScroll.current, 0, {
          scrollComplete: () => {
            setNoImagesFromApi(true);
            isGettingImages.current = false;
          },
        });
      }, 1500);
  }, [hasApiError, hasNoImagesError]);

  useEffect(() => {
    if (haveAllImages && imageLoadCount === carouselImages.length) {
      setTimeout(() => {
        if (carouselScroll.current) {
          // to override ios' momentum/inertia scrolling
          if (selectedImage && selectedImage !== 1) {
            const carouselScrollChildren = carouselScroll.current?.children[
              selectedImage
            ] as HTMLElement;
            const selectedImagePos = carouselScrollChildren?.offsetLeft ?? 0;
            carouselScroll.current.scrollTo({ left: selectedImagePos });
          } else {
            const carouselScrollChildren = carouselScroll.current
              ?.children[1] as HTMLElement;
            const secondImagePos = carouselScrollChildren?.offsetLeft ?? 0;
            carouselScroll.current.scrollTo({ left: secondImagePos });
          }

          const placeholderItem =
            carouselScroll.current.querySelector(".sc--placeholder");
          placeholderItem?.classList.remove("sc--placeholder");
        }

        setShowLoader(false);
        showDots && handleDotUpdate();
        isGettingImages.current = false;
      }, 100);
    }
  }, [haveAllImages, carouselImages, imageLoadCount, showDots]);

  useEffect(() => {
    carouselImages.length > 0 && setHaveAllImages(true);
  }, [carouselImages]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (carouselScroll.current && postLoad) {
      setIsTouchDevice(!!carouselScroll.current.closest(".touch-device"));
    }
  }, [carouselScroll.current, postLoad]);

  useEffect(() => {
    if (postLoad && showDots) {
      getDotElement(carouselDots.current, 0).classList.add("sc--active-dot");
    }
  }, [postLoad, showDots]);

  useDidMountEffect(() => {
    updateNavDisabledState();
    if (haveAllImages && carouselScroll.current) {
      setItemCount(carouselScroll.current.children.length);
    }
  }, [haveAllImages]);

  return (
    <>
      {hasImages && (
        <>
          {showLoader && (
            <CarouselLoader
              hasApiError={hasApiError}
              hasNoImagesError={hasNoImagesError}
            />
          )}
          <CarouselNav
            direction="left"
            className={classNames(
              { "sc--disabled": leftNavDisabled },
              { "sc--hide-nav-arrow": showLoader }
            )}
            navInteraction={handleNavInteraction}
          />
          <CarouselNav
            direction="right"
            className={classNames(
              { "sc--disabled": rightNavDisabled },
              { "sc--hide-nav-arrow": showLoader }
            )}
            navInteraction={handleNavInteraction}
          />
        </>
      )}
      <div
        className="sc--image-carousel--scroller"
        onScroll={handleCarouselScrolling}
        ref={carouselScroll}
      >
        <CarouselImage
          href={imageUrl}
          src={heroImage}
          className="sc--hero-image"
          alt={imageAltText}
          tabIndex="0"
        />
        {hasImages && (
          <CarouselImage
            href={imageUrl}
            src={carouselImages[0]?.src}
            onLoad={carouselImageLoaded}
            className="sc--placeholder"
            tabIndex="0"
          />
        )}
        {renderImages()}
      </div>
      {showDots && (
        <div className="sc--image-carousel--dots" ref={carouselDots}>
          {Array.from(Array(itemCount)).map((v, i) => (
            <span key={i}></span>
          ))}
        </div>
      )}
    </>
  );
};

export default memo(CarouselScroller);
