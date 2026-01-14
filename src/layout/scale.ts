export const DESKTOP_REFERENCE_WIDTH = 1280;
export const DESKTOP_REFERENCE_HEIGHT = 800;
export const MOBILE_REFERENCE_WIDTH = 390;
export const MOBILE_REFERENCE_HEIGHT = 844;

export const desktopPxToVw = (px: number) =>
  `${((px / DESKTOP_REFERENCE_WIDTH) * 100).toFixed(2)}vw`;

export const mobilePxToVw = (px: number) =>
  `${((px / MOBILE_REFERENCE_WIDTH) * 100).toFixed(2)}vw`;

export const desktopVhToVw = (vh: number) =>
  `${((vh * DESKTOP_REFERENCE_HEIGHT) / DESKTOP_REFERENCE_WIDTH).toFixed(2)}vw`;

export const mobileVhToVw = (vh: number) =>
  `${((vh * MOBILE_REFERENCE_HEIGHT) / MOBILE_REFERENCE_WIDTH).toFixed(2)}vw`;

export const mobileVhToVh = (vh: number) => `${vh}vh`;
