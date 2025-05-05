import * as React from "react";

const Slider = React.forwardRef(({ min = 0, max = 100, step = 1, value, onChange, className = "", ...props }, ref) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      ref={ref}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
      {...props}
    />
  );
});

Slider.displayName = "Slider";

export { Slider };
