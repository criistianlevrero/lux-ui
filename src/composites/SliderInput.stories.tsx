import React from "react";
import { Meta, Story } from "@ladle/react";
import SliderInput from "./SliderInput";

export default {
  title: "Composites / SliderInput",
  description: "Composite slider + value display based on sequencer transport controls from the core app",
} satisfies Meta;

export const BpmControl: Story = () => {
  const [value, setValue] = React.useState(128);

  return (
    <div className="max-w-xl bg-gray-900 p-6 text-gray-100">
      <SliderInput
        label="BPM"
        value={value}
        min={60}
        max={200}
        step={1}
        valueFormatter={(current) => `${current}`}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </div>
  );
};

export const InterpolationControl: Story = () => {
  const [value, setValue] = React.useState(0.25);

  return (
    <div className="max-w-xl bg-gray-900 p-6 text-gray-100">
      <SliderInput
        label="Interpolation speed"
        value={value}
        min={0}
        max={1}
        step={0.05}
        valueFormatter={(current) => (current === 0 ? "Instant" : `${current.toFixed(2)}s`)}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </div>
  );
};