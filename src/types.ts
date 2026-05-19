// from 'nouislider'
export type WrappedSubRange = [number] | [number, number];
export type SubRange = number | WrappedSubRange;
export interface Range {
    min: SubRange;
    max: SubRange;

    [key: `${number}%`]: SubRange;
}
// end 'nouislider' types

export interface Callback {
    /**
     * Array for both one-handle and two-handle sliders. It contains the current slider values,
     * with formatting applied.
     */
    (values: any[], handle: number, unencodedValues: number[], tap: boolean, positions: number[]): void;
}

export interface Formatter {
    to(val: number): string | number;
    from(val: string | number): number;
}

export interface CssClasses {
    target: string,
    base: string,
    origin: string,
    handle: string,
    handleLower: string,
    handleUpper: string,
    touchArea: string,
    horizontal: string,
    vertical: string,
    background: string,
    connect: string,
    connects: string,
    ltr: string,
    rtl: string,
    textDirectionLtr: string,
    textDirectionRtl: string,
    draggable: string,
    drag: string,
    tap: string,
    active: string,
    tooltip: string,
    pips: string,
    pipsHorizontal: string,
    pipsVertical: string,
    marker: string,
    markerHorizontal: string,
    markerVertical: string,
    markerNormal: string,
    markerLarge: string,
    markerSub: string,
    value: string,
    valueHorizontal: string,
    valueVertical: string,
    valueNormal: string,
    valueLarge: string,
    valueSub: string,
}

export interface NouisliderProps {
  // https://refreshless.com/nouislider/slider-options/#section-animate
  animate?: boolean;
  // https://refreshless.com/nouislider/behaviour-option/
  behaviour?: string;
  className?: string;
  clickablePips?: boolean;
  // https://refreshless.com/nouislider/slider-options/#section-connect
  connect?: boolean[] | boolean;
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  direction?: "ltr" | "rtl";
  // https://refreshless.com/nouislider/more/#section-disable
  disabled?: boolean;
  format?: Formatter;
  keyboardSupport?: boolean;
  id?: string;
  instanceRef?: (instance: React.Ref<any>) => void;
  // https://refreshless.com/nouislider/slider-options/#section-limit
  limit?: number;
  // https://refreshless.com/nouislider/slider-options/#section-margin
  margin?: number;
  cssPrefix?: string;
  cssClasses?: Partial<CssClasses>;
  // https://refreshless.com/nouislider/events-callbacks/#section-change
  onChange?: Callback;
  // https://refreshless.com/nouislider/events-callbacks/
  onEnd?: Callback;
  // https://refreshless.com/nouislider/events-callbacks/#section-set
  onSet?: Callback;
  // http://refreshless.com/nouislider/events-callbacks/#section-slide
  onSlide?: Callback;
  // http://refreshless.com/nouislider/events-callbacks/
  onStart?: Callback;
  // http://refreshless.com/nouislider/events-callbacks/#section-update
  onUpdate?: Callback;
  // https://refreshless.com/nouislider/slider-options/#section-orientation
  orientation?: "horizontal" | "vertical";
  // https://refreshless.com/nouislider/slider-options/#section-padding
  padding?: number | number[];
  // https://refreshless.com/nouislider/pips/
  pips?: object;
  // https://refreshless.com/nouislider/slider-values/#section-range
  range: Range;
  snap?: boolean;
  // https://refreshless.com/nouislider/slider-options/#section-start
  start: number | number[] | string | string[];
  // https://refreshless.com/nouislider/slider-options/#section-step
  step?: number;
  style?: React.CSSProperties;
  // https://refreshless.com/nouislider/slider-options/#section-tooltips
  tooltips?: boolean | (boolean | Formatter)[];
}
