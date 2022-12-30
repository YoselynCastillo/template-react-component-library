import React from "react";
import { memo, useCallback, useMemo, useState } from "react";
import CarouselScroller from "../CarouselScroller";
import { IImageCarousel } from "../types";
import "./ImageCarousel.scss";

const imageTypes = [
  "Front Driver Compartment",
  "Dashboard",
  "Trunk/Cargo (Seats Up)",
  "Rear",
];

const ImageCarousel = ({
  stockNumber,
  badges,
  hasImages: imagesAvailable,
  imageAltText,
  postLoad = true,
  imageUrl,
  viewMoreHref,
  getCarImages,
  imageSize,
  imageApiUri
}: IImageCarousel) => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [noImagesError, setNoImagesError] = useState(false);
  const [noImagesFromApi, setNoImagesFromApi] = useState(false);

  const heroImage = useMemo(() => `https://img2.carmax.com/assets/${stockNumber}/hero.jpg?width=${imageSize}`, [
        imageApiUri,
        stockNumber,
    ]);
  const hasImages = useMemo(
    () => imagesAvailable && !noImagesFromApi,
    [imagesAvailable, noImagesFromApi]
  );

  const filterByImageTypes = useCallback((allImages: any) => {
    const imageLinks = allImages
      .filter((image: any) => imageTypes.includes(image.metadata.tag))
      .sort(
        (a: any, b: any) =>
          imageTypes.indexOf(a.metadata.tag) -
          imageTypes.indexOf(b.metadata.tag)
      )
      .map((image: any) => ({
        src: `https://img2.carmax.com/${image.path}`
          .replace("{w}", '800')
          .replace("{r}", "4/3"),
        tag: image.metadata.tag,
      }));

    if (imageLinks.length > 0) {
      setCarouselImages(imageLinks);
    } else {
      setNoImagesError(true);
    }
  }, []);

// TODO: Comparar el cuerpo de la funcion en online-systems-bla-bla y averiguar de donde salen cosas como SearchApi
  const getAllImages = useCallback(() => {
    getCarImages(
      stockNumber,
      (res: { images: any; }) => {
        res.images && filterByImageTypes(res.images);
      },
      (err: any) => setApiError(true)
    );
  }, [stockNumber, filterByImageTypes]);

  const resetError = useCallback(() => {
    setApiError(false);
  }, []);

  return (
    <div
      className="sc--image-carousel"
      data-clickprops={`Element type: Car Tile Image,StockNumber: ${stockNumber}`}
    >
      <div className="sc--image-carousel--viewer">
        <CarouselScroller
          heroImage={heroImage && heroImage}
          carouselImages={carouselImages}
          badges={badges}
          getAllImages={getAllImages}
          hasImages={hasImages}
          hasApiError={apiError}
          hasNoImagesError={noImagesError}
          setNoImagesFromApi={setNoImagesFromApi}
          resetError={resetError}
          imageAltText={imageAltText}
          postLoad={postLoad}
          imageUrl={imageUrl}
          viewMoreHref={viewMoreHref}
        />
      </div>
    </div>
  );
};

export default memo(ImageCarousel);
