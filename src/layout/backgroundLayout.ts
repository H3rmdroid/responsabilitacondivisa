import { desktopVhToVw, mobileVhToVw } from "./scale";

export type BackgroundSvgLayout = {
  containerHeight: string;
  containerTop: string;
  containerLeft: string;
  containerRight: string;
  svgTop: number;
  svgLeft: string | number;
  svgWidth: string;
  svgMaxWidth: string | undefined;
  svgTransform: string;
  svgPreserveAspectRatio: string;
};

export type ThreadsSvgLayout = {
  opacityRange: [number, number];
  pathCap: number;
  stickyRelease: number;
  containerTop: string;
  containerLeft: string;
  containerRight: string;
  containerHeight: string;
  svgTop: number;
  svgLeft: string | number;
  svgWidth: string;
  svgTransform: string;
  svgTransformOrigin: string;
  svgPreserveAspectRatio: string;
};

export type ThreadsSvg2Layout = {
  opacityRange: [number, number];
  pathCap: number;
  containerTop: string;
  containerLeft: string;
  containerRight: string;
  containerHeight: string;
  svgTop: number;
  svgLeft: string | number;
  svgRight: number | string | undefined;
  svgWidth: string;
  svgTransform: string;
  svgTransformOrigin: string;
  svgPreserveAspectRatio: string;
};

export type DecorativeSvgLayout = {
  containerTop: string;
  containerLeft: string;
  containerRight: string;
  containerHeight: string;
  svgWidth: string;
  svgLeft: string;
  svgTransform: string;
  svgTop: number;
  svgPreserveAspectRatio: string;
};

export type BackgroundLayout = {
  pageMinHeight: string;
  threadsSectionMinHeight: string;
  backgroundSvg: BackgroundSvgLayout;
  threadsSvg: ThreadsSvgLayout;
  threadsSvg2: ThreadsSvg2Layout;
  decorativeSvg: DecorativeSvgLayout;
};

type MinHeightSource = {
  top: string;
  height: string;
};

const buildPageMinHeight = (
  sources: MinHeightSource[],
  extra: string = "0px"
): string => {
  const parts = sources
    .filter((source) => source.height !== "auto")
    .map((source) => `calc(${source.top} + ${source.height} + ${extra})`);

  if (parts.length === 0) {
    return `calc(100vh + ${extra})`;
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `max(${parts.join(", ")})`;
};

const THREADS_VIEWBOX_WIDTH = 393.34;
const THREADS_VIEWBOX_HEIGHT = 1200;
const THREADS2_VIEWBOX_HEIGHT = 900;

const toVwHeight = (height: number) =>
  `${((height / THREADS_VIEWBOX_WIDTH) * 100).toFixed(2)}vw`;

export const getBackgroundLayout = (isDesktop: boolean): BackgroundLayout => {
  const footerMinHeight = "0vh";
  const threadsFootprintHeight = toVwHeight(THREADS_VIEWBOX_HEIGHT);
  const threads2FootprintHeight = toVwHeight(THREADS2_VIEWBOX_HEIGHT);
  const backgroundSvg: BackgroundSvgLayout = isDesktop
    ? {
        containerHeight: desktopVhToVw(100),
        containerTop: "0px",
        containerLeft: "0px",
        containerRight: "0px",
        svgTop: 0,
        svgLeft: "50%",
        svgWidth: "100vw",
        svgMaxWidth: undefined,
        svgTransform: "translateX(-50%)",
        svgPreserveAspectRatio: "xMidYStart meet",
      }
    : {
        containerHeight: mobileVhToVw(240),
        containerTop: "0px",
        containerLeft: "0px",
        containerRight: "0px",
        svgTop: 0,
        svgLeft: "50%",
        svgWidth: "109vw",
        svgMaxWidth: "2000px",
        svgTransform: "translateX(-50%)",
        svgPreserveAspectRatio: "xMidYStart meet",
      };

  const threadsSvg: ThreadsSvgLayout = isDesktop
    ? {
        opacityRange: [0, 0.08],
        pathCap: 1,
        stickyRelease: 0.36,
        containerTop: desktopVhToVw(854),
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: desktopVhToVw(100),
        svgTop: 0,
        svgLeft: "50%",
        svgWidth: "100vw",
        svgTransform: "translateX(-50%)",
        svgTransformOrigin: "top left",
        svgPreserveAspectRatio: "xMidYStart meet",
      }
    : {
        opacityRange: [0, 0.08],
        pathCap: 1,
        stickyRelease: 0.36,
        containerTop: mobileVhToVw(269),
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: mobileVhToVw(100),
        svgTop: 0,
        svgLeft: "50%",
        svgWidth: "109vw",
        svgTransform: "translateX(-50%)",
        svgTransformOrigin: "top left",
        svgPreserveAspectRatio: "xMidYStart meet",
      };

  const threadsSvg2: ThreadsSvg2Layout = isDesktop
    ? {
        opacityRange: [0, 0.08],
        pathCap: 1,
        containerTop: desktopVhToVw(1036.5),
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: desktopVhToVw(100),
        svgTop: 0,
        svgLeft: "50%",
        svgTransform: "translateX(-50%)",
        svgRight: undefined,
        svgWidth: "100vw",
        svgTransformOrigin: "top left",
        svgPreserveAspectRatio: "xMidYStart meet",
      }
    : {
        opacityRange: [0, 0.08],
        pathCap: 1,
        containerTop: mobileVhToVw(326.5),
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: mobileVhToVw(100),
        svgTop: 0,
        svgLeft: "50%",
        svgRight: undefined,
        svgWidth: "109vw",
        svgTransform: "translateX(-50%)",
        svgTransformOrigin: "top left",
        svgPreserveAspectRatio: "xMidYStart meet",
      };

  const decorativeSvg: DecorativeSvgLayout = isDesktop
    ? {
        containerTop: desktopVhToVw(540),
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: desktopVhToVw(100),
        svgWidth: "100vw",
        svgTop: 0,
        svgLeft: "50%",
        svgTransform: "translateX(-50%)",
        svgPreserveAspectRatio: "xMidYStart meet",
      }
    : {
        containerTop: mobileVhToVw(104),
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: mobileVhToVw(100),
        svgTop: 0,
        svgWidth: "109vw",
        svgLeft: "50%",
        svgTransform: "translateX(-50%)",
        svgPreserveAspectRatio: "xMidYStart meet",
      };

  const threadsSvgTop = `calc(${threadsSvg.containerTop} + ${threadsSvg.svgTop}px)`;
  const threadsSvg2Top = `calc(${threadsSvg2.containerTop} + ${threadsSvg2.svgTop}px)`;
  const pageMinHeightSources = isDesktop
    ? [
        { top: backgroundSvg.containerTop, height: backgroundSvg.containerHeight },
        { top: threadsSvgTop, height: threadsFootprintHeight },
        { top: threadsSvg2Top, height: threads2FootprintHeight },
      ]
    : [{ top: backgroundSvg.containerTop, height: backgroundSvg.containerHeight }];
  const pageMinHeight = buildPageMinHeight(pageMinHeightSources, footerMinHeight);
  const threadsSectionMinHeight = buildPageMinHeight([
    { top: threadsSvg.containerTop, height: threadsFootprintHeight },
    { top: threadsSvg2.containerTop, height: threads2FootprintHeight },
  ]);

  return {
    pageMinHeight,
    threadsSectionMinHeight,
    backgroundSvg,
    threadsSvg,
    threadsSvg2,
    decorativeSvg,
  };
};
