export interface IMakeModelInfo {
  href?: string;
  make?: string;
  model?: string;
  year?: number;
  trim?: string | undefined;
}

export interface IPriceMilesInfo {
  stockNumber?: string;
  basePrice?: any;
  msrp?: any;
  isNew?: boolean;
  mileage: number;
  root?: string;
}
export interface IStoreTransferInfo {
  transferText?: string;
}

export interface IImageCarousel {
  stockNumber?: any;
  badges?: any;
  hasImages?: any;
  imageAltText?: any;
  postLoad?: any;
  imageUrl?: any;
  viewMoreHref?: any;
  getCarImages?: any;
  imageSize?: any;
  imageApiUri?: any;
}

export interface ICarouselScroller {
  heroImage?: any;
  carouselImages?: any;
  badges?: any;
  getAllImages?: any;
  hasImages?: any;
  hasApiError?: any;
  hasNoImagesError?: any;
  setNoImagesFromApi?: any;
  resetError?: any;
  imageAltText?: any;
  postLoad?: any;
  imageUrl?: any;
  viewMoreHref?: any;
}
export interface ICarouselItem {
  children?: any;
  className?: any;
}

export interface ICarouselImage {
  src?: any;
  alt?: any;
  onLoad?: any;
  key?: any;
  href?: any;
  className?: any;
  tabIndex?: any;
  children?: any;
}
export interface ICarouselNav {
  direction?: any;
  className?: any;
  navInteraction?: any;
}
