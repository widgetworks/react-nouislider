import * as React from 'react';
import { cssClasses } from 'nouislider';

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
    animate?: boolean;
    behaviour?: string;
    className?: string;
    clickablePips?: boolean;
    connect?: boolean[] | boolean;
    direction?: "ltr" | "rtl";
    disabled?: boolean;
    format?: Formatter;
    keyboardSupport?: boolean;
    id?: string;
    instanceRef?: (instance: React.Ref<any>) => void;
    limit?: number;
    margin?: number;
    cssPrefix?: string;
    cssClasses?: Partial<CssClasses>;
    onChange?: Callback;
    onEnd?: Callback;
    onSet?: Callback;
    onSlide?: Callback;
    onStart?: Callback;
    onUpdate?: Callback;
    orientation?: "horizontal" | "vertical";
    padding?: number | number[];
    pips?: object;
    range: object;
    snap?: boolean;
    start: number | number[] | string | string[];
    step?: number;
    style?: React.CSSProperties;
    tooltips?: boolean | (boolean | Formatter)[];
}

export default class Nouislider extends React.Component<NouisliderProps> {}
export {
    cssClasses,
}
