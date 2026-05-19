import React from "react";
import { render } from "@testing-library/react";
import Nouislider from "../src";

describe("Slider", () => {
  test("mounted correctly", () => {
    const { container } = render(
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
    );
    expect(container.firstChild).toHaveClass("noUi-target");
  });

  test("should apply id option and pass it to div", () => {
    const { container } = render(
      <Nouislider
        id="test"
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        connect
      />
    );
    expect(container.firstChild).toHaveAttribute("id", "test");
  });

  test("should apply className option and pass it to div", () => {
    const { container } = render(
      <Nouislider
        className="test"
        range={{ min: 0, max: 100 }}
        start={[20, 80]}
        connect
      />
    );
    expect(container.firstChild).toHaveClass("test");
  });

  test("should add cursor style if clickablePips props was passed", () => {
    const { container } = render(
      <Nouislider
        start={[50]}
        pips={{ mode: "count", values: 5 }}
        clickablePips
        range={{
          min: 0,
          max: 100,
        }}
      />
    );
    expect(container.innerHTML).toContain("cursor: pointer");
  });

  test("disabled prop should passed correctly", () => {
    const { container } = render(
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} disabled />
    );
    expect(container.firstChild).toHaveAttribute("disabled");
  });

  test("unmount correctly", () => {
    const { unmount } = render(
      <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} disabled />
    );
    unmount();
    const { container } = render(
      <Nouislider range={{ min: 0, max: 10 }} start={5} id="unmount" />
    );
    expect(container.firstChild).toHaveAttribute("id", "unmount");
  });

  describe("areEqual", () => {
    test("return right result for start", () => {
      const { container, rerender } = render(
        <Nouislider
          className="test"
          range={{ min: 0, max: 100 }}
          start={20}
          connect
        />
      );
      rerender(
        <Nouislider
          className="test"
          range={{ min: 0, max: 100 }}
          start={80}
          connect
        />
      );
      expect(container.innerHTML).toContain('aria-valuenow="80.0"');
    });

    test("return right result for disabled", () => {
      const { container, rerender } = render(
        <Nouislider
          className="test"
          range={{ min: 0, max: 100 }}
          start={20}
          connect
          disabled={false}
        />
      );
      rerender(
        <Nouislider
          className="test"
          range={{ min: 0, max: 100 }}
          start={20}
          connect
          disabled={true}
        />
      );
      expect(container.firstChild).toHaveAttribute("disabled");
    });

    test("return right result for range", () => {
      const { container, rerender } = render(
        <Nouislider
          className="test"
          range={{ min: 0, max: 50 }}
          start={20}
          connect
          disabled={false}
        />
      );
      rerender(
        <Nouislider
          className="test"
          range={{ min: 0, max: 100 }}
          start={20}
          connect
          disabled={false}
        />
      );
      expect(container.innerHTML).toContain('aria-valuemax="100.0"');
    });

    test("return right result for step", () => {
      const { container, rerender } = render(
        <Nouislider
          className="test"
          start={0}
          range={{ min: 0, max: 50 }}
          step={1}
          connect
          disabled={false}
        />
      );
      rerender(
        <Nouislider
          className="test"
          start={0}
          range={{ min: 0, max: 50 }}
          step={5}
          connect
          disabled={false}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("instanceRef", () => {
    test("functional instanceRef", () => {
      const refFunc = vi.fn();
      render(
        <Nouislider
          instanceRef={(instance) => refFunc(instance)}
          start={0}
          range={{
            min: 0,
            max: 50,
          }}
        />
      );
      expect(refFunc).toHaveBeenCalled();
    });

    test("instanceRef with React.createRef", () => {
      const ref = React.createRef();
      const { container } = render(
        <Nouislider
          instanceRef={ref}
          start={0}
          range={{
            min: 0,
            max: 50,
          }}
        />
      );
      expect(container.querySelector("div")).toEqual(ref.current);
    });

    test("instanceRef with React.createRef is null after unmount", () => {
      const ref = React.createRef();
      const { unmount } = render(
        <Nouislider
          instanceRef={ref}
          start={0}
          range={{
            min: 0,
            max: 50,
          }}
        />
      );
      unmount();
      expect(ref.current).toBe(null);
    });
  });

  describe("css props", () => {
    test("should apply cssPrefix to css classes", () => {
      const { container } = render(
        <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} cssPrefix="PREFIX-" />
      );
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<div class="PREFIX-target PREFIX-ltr PREFIX-horizontal PREFIX-txt-dir-ltr"><div class="PREFIX-base"><div class="PREFIX-connects"></div><div class="PREFIX-origin" style="transform: translate(-80%, 0); z-index: 5;"><div class="PREFIX-handle PREFIX-handle-lower" data-handle="0" tabindex="0" role="slider" aria-orientation="horizontal" aria-valuemin="0.0" aria-valuemax="80.0" aria-valuenow="20.0" aria-valuetext="20.00"><div class="PREFIX-touch-area"></div></div></div><div class="PREFIX-origin" style="transform: translate(-20%, 0); z-index: 4;"><div class="PREFIX-handle PREFIX-handle-upper" data-handle="1" tabindex="0" role="slider" aria-orientation="horizontal" aria-valuemin="20.0" aria-valuemax="100.0" aria-valuenow="80.0" aria-valuetext="80.00"><div class="PREFIX-touch-area"></div></div></div></div></div>"`
      );
    });

    test("should apply cssClasses", () => {
      const cssClasses = {
        target: "Ztarget",
        base: "Zbase",
        origin: "Zorigin",
        handle: "Zhandle",
        handleLower: "Zhandle-lower",
        handleUpper: "Zhandle-upper",
        touchArea: "Ztouch-area",
        horizontal: "Zhorizontal",
        vertical: "Zvertical",
        background: "Zbackground",
        connect: "Zconnect",
        connects: "Zconnects",
        ltr: "Zltr",
        rtl: "Zrtl",
        textDirectionLtr: "Ztxt-dir-ltr",
        textDirectionRtl: "Ztxt-dir-rtl",
        draggable: "Zdraggable",
        drag: "Zstate-drag",
        tap: "Zstate-tap",
        active: "Zactive",
        tooltip: "Ztooltip",
        pips: "Zpips",
        pipsHorizontal: "Zpips-horizontal",
        pipsVertical: "Zpips-vertical",
        marker: "Zmarker",
        markerHorizontal: "Zmarker-horizontal",
        markerVertical: "Zmarker-vertical",
        markerNormal: "Zmarker-normal",
        markerLarge: "Zmarker-large",
        markerSub: "Zmarker-sub",
        value: "Zvalue",
        valueHorizontal: "Zvalue-horizontal",
        valueVertical: "Zvalue-vertical",
        valueNormal: "Zvalue-normal",
        valueLarge: "Zvalue-large",
        valueSub: "Zvalue-sub",
      };

      const { container } = render(
        <Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} cssClasses={cssClasses} />
      );
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<div class="noUi-Ztarget noUi-Zltr noUi-Zhorizontal noUi-Ztxt-dir-ltr"><div class="noUi-Zbase"><div class="noUi-Zconnects"></div><div class="noUi-Zorigin" style="transform: translate(-80%, 0); z-index: 5;"><div class="noUi-Zhandle noUi-Zhandle-lower" data-handle="0" tabindex="0" role="slider" aria-orientation="horizontal" aria-valuemin="0.0" aria-valuemax="80.0" aria-valuenow="20.0" aria-valuetext="20.00"><div class="noUi-Ztouch-area"></div></div></div><div class="noUi-Zorigin" style="transform: translate(-20%, 0); z-index: 4;"><div class="noUi-Zhandle noUi-Zhandle-upper" data-handle="1" tabindex="0" role="slider" aria-orientation="horizontal" aria-valuemin="20.0" aria-valuemax="100.0" aria-valuenow="80.0" aria-valuetext="80.00"><div class="noUi-Ztouch-area"></div></div></div></div></div>"`
      );
    });
  });
});
