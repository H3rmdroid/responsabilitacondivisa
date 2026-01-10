export type BackgroundSvgLayout = {
  containerHeight: string;
  containerTop: string;
  containerLeft: string;
  containerRight: string;
  svgTop: string;
  svgLeft: number;
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
  svgLeft: number;
  svgWidth: string;
  svgTransform: string;
  svgTransformOrigin: string;
};

export type ThreadsSvg2Layout = {
  opacityRange: [number, number];
  pathCap: number;
  containerTop: string;
  containerLeft: string;
  containerRight: string;
  containerHeight: string;
  svgTop: number;
  svgLeft: number;
  svgRight: number | string | undefined;
  svgWidth: string;
  svgTransformOrigin: string;
};

export type DecorativeSvgLayout = {
  containerTop: string;
  containerLeft: string;
  containerRight: string;
  containerHeight: string;
  svgWidth: string;
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
        containerHeight: "100vh",
        containerTop: "0px",
        containerLeft: "0px",
        containerRight: "0px",
        svgTop: "0px",
        svgLeft: 0,
        svgWidth: "100vw",
        svgMaxWidth: undefined,
        svgTransform: "none",
        svgPreserveAspectRatio: "xMidYStart meet",
      }
    : {
        containerHeight: "240vh",
        containerTop: "0px",
        containerLeft: "0px",
        containerRight: "0px",
        svgTop: "0px",
        svgLeft: 0,
        svgWidth: "109vw",
        svgMaxWidth: undefined,
        svgTransform: "none",
        svgPreserveAspectRatio: "xMidYStart meet",
      };

  const threadsSvg: ThreadsSvgLayout = isDesktop
    ? {
        opacityRange: [0, 0.08],
        pathCap: 1,
        stickyRelease: 0.36,
        containerTop: "935vh",
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: "100vh",
        svgTop: 0,
        svgLeft: 0,
        svgWidth: "100vw",
        svgTransform: "none",
        svgTransformOrigin: "top left",
      }
    : {
        opacityRange: [0, 0.08],
        pathCap: 1,
        stickyRelease: 0.36,
        containerTop: "441vh",
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: "100vh",
        svgTop: 0,
        svgLeft: 0,
        svgWidth: "109vw",
        svgTransform: "none",
        svgTransformOrigin: "top left",
      };

  const threadsSvg2: ThreadsSvg2Layout = isDesktop
    ? {
        opacityRange: [0, 0.08],
        pathCap: 1,
        containerTop: "1119vh",
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: "100vh",
        svgTop: 0,
        svgLeft: 0,
        svgRight: undefined,
        svgWidth: "100vw",
        svgTransformOrigin: "top left",
      }
    : {
        opacityRange: [0, 0.08],
        pathCap: 1,
        containerTop: "506vh",
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: "100vh",
        svgTop: 0,
        svgLeft: 0,
        svgRight: undefined,
        svgWidth: "109vw",
        svgTransformOrigin: "top left",
      };

  const decorativeSvg: DecorativeSvgLayout = isDesktop
    ? {
        containerTop: "540vh",
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: "auto",
        svgWidth: "100vw",
      }
    : {
        containerTop: "304vh",
        containerLeft: "0px",
        containerRight: "0px",
        containerHeight: "1px",
        svgWidth: "109vw",
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
