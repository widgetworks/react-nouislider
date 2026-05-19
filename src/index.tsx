import React, { useEffect, useState, useRef } from "react";
import nouislider, { cssClasses, type API, type Options } from "nouislider";

import { isEqual } from "./utils";
import {NouisliderProps} from './types';

const areEqual = (prevProps: NouisliderProps, nextProps: NouisliderProps) => {
  const { start, step, disabled, range } = prevProps;
  return (
    nextProps.step === step &&
    isEqual(nextProps.start, start) &&
    nextProps.disabled === disabled &&
    isEqual(nextProps.range, range)
  );
};

const defaultProps = {
  // https://refreshless.com/nouislider/slider-options/#section-animate
  animate: true,
  // https://refreshless.com/nouislider/behaviour-option/
  behaviour: "tap",
  className: null,
  clickablePips: false,
  // https://refreshless.com/nouislider/slider-options/#section-connect
  connect: false,
  // http://refreshless.com/nouislider/slider-options/#section-orientation
  direction: "ltr",
  // https://refreshless.com/nouislider/more/#section-disable
  disabled: false,
  format: null,
  // https://refreshless.com/nouislider/slider-options/#section-margin
  margin: null,
  // https://refreshless.com/nouislider/slider-options/#section-limit
  limit: null,
  keyboardSupport: true,
  id: null,
  instanceRef: null,
  // https://refreshless.com/nouislider/slider-options/#section-padding
  padding: 0,
  // https://refreshless.com/nouislider/pips/
  pips: null,
  snap: false,
  // https://refreshless.com/nouislider/slider-options/#section-step
  step: null,
  style: null,
  // https://refreshless.com/nouislider/slider-options/#section-orientation
  orientation: "horizontal",
  // https://refreshless.com/nouislider/slider-options/#section-tooltips
  tooltips: false,
  // https://refreshless.com/nouislider/events-callbacks/#section-change
  onChange: () => {},
  // https://refreshless.com/nouislider/events-callbacks/
  onEnd: () => {},
  // https://refreshless.com/nouislider/events-callbacks/#section-set
  onSet: () => {},
  // http://refreshless.com/nouislider/events-callbacks/#section-slide
  onSlide: () => {},
  // http://refreshless.com/nouislider/events-callbacks/
  onStart: () => {},
  // http://refreshless.com/nouislider/events-callbacks/#section-update
  onUpdate: () => {}
};

const Nouislider = (_props: NouisliderProps) => {
  const props = {
    ...defaultProps,
    ..._props,
  };
  const [slider, setSlider] = useState<API | null>(null);
  const sliderContainer = useRef<HTMLDivElement & {noUiSlider: any}>(null);
  const { instanceRef } = props;

  useEffect(() => {
    if (instanceRef && instanceRef instanceof Function) {
      instanceRef(sliderContainer.current as any);
    }

    if (instanceRef && 'current' in instanceRef) {
      // eslint-disable-next-line no-param-reassign
      instanceRef.current = sliderContainer.current;
    }

    return () => {
      if (instanceRef && 'current' in instanceRef) {
        // eslint-disable-next-line no-param-reassign
        instanceRef.current = null;
      }
    };
  }, [instanceRef]);

  const clickOnPip = pip => {
    const value = Number(pip.target.getAttribute("data-value"));
    if (slider) {
      slider.set(value);
    }
  };

  const toggleDisable = disabled => {
    const sliderHTML = sliderContainer.current;
    if (sliderHTML) {
      if (!disabled) {
        sliderHTML.removeAttribute("disabled");
      } else {
        sliderHTML.setAttribute("disabled", true as any);
      }
    }
  };

  const { onUpdate, onChange, onSlide, onStart, onEnd, onSet } = props;

  const updateEvents = (sliderComponent: API) => {
    if (onStart) {
      sliderComponent.off("start");
      sliderComponent.on("start", onStart);
    }

    if (onSlide) {
      sliderComponent.off("slide");
      sliderComponent.on("slide", onSlide);
    }

    if (onUpdate) {
      sliderComponent.off("update");
      sliderComponent.on("update", onUpdate);
    }

    if (onChange) {
      sliderComponent.off("change");
      sliderComponent.on("change", onChange);
    }

    if (onSet) {
      sliderComponent.off("set");
      sliderComponent.on("set", onSet);
    }

    if (onEnd) {
      sliderComponent.off("end");
      sliderComponent.on("end", onEnd);
    }
  }

  const updateOptions = options => {
    const sliderHTML = sliderContainer.current;
    sliderHTML!.noUiSlider.updateOptions(options);
  };

  const setClickableListeners = () => {
    if (props.clickablePips) {
      const sliderHTML = sliderContainer.current;
      ([...sliderHTML!.querySelectorAll(".noUi-value")] as HTMLElement[]).forEach(pip => {
        pip.style.cursor = "pointer";
        pip.addEventListener("click", clickOnPip);
      });
    }
  };

  const createSlider = () => {
    if (sliderContainer.current?.noUiSlider) return;

    const sliderComponent = nouislider.create(sliderContainer.current as HTMLElement, {
      ...props as Options
    });

    updateEvents(sliderComponent);

    setSlider(sliderComponent);
  };

  useEffect(() => {
    const { disabled } = props;
    const sliderHTML = sliderContainer.current;
    if (sliderHTML) {
      toggleDisable(disabled);
      createSlider();
    }
    return () => {
      if (slider) slider.destroy();
      if (sliderHTML) {
        [...sliderHTML.querySelectorAll(".noUi-value")].forEach(pip => {
          pip.removeEventListener("click", clickOnPip);
        });
      }
    };
  }, []);

  useEffect(() => {
    if (slider) {
      setClickableListeners()
    }
  }, [slider]);

  const { start, disabled, range, step, margin, padding, limit, pips, snap, animate } = props;

  useEffect(() => {
    if (slider) {
      updateOptions({range, step, padding, margin, limit, pips, snap, animate});
      slider.set(start);
      setClickableListeners()
    }
    toggleDisable(disabled);
  }, [start, disabled, range, step, margin, padding, limit, pips, snap, animate]);

  useEffect(() => {
    if (slider) {
      updateEvents(slider)
    }
  }, [onUpdate, onChange, onSlide, onStart, onEnd, onSet])

  const { id, className, style } = props;
  const options: any = {};
  if (id) {
    options.id = id;
  }
  if (className) {
    options.className = className;
  }
  return <div {...options} ref={sliderContainer} style={style} />;
};

export default React.memo(Nouislider, areEqual);
export {
  cssClasses,
};
