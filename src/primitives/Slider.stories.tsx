import React from "react";
import { Meta, Story } from "@ladle/react";
import { Card } from "./Card";
import { FieldLabel } from "./FieldLabel";
import { Slider } from "./Slider";

export default {
  title: "Primitives / Slider",
  description: "Slider stories aligned with numeric controls from the core app",
} satisfies Meta;

export const TransportControl: Story = () => {
  const [value, setValue] = React.useState(120);

  return (
    <Card className="max-w-xl bg-gray-900 text-gray-100" padding="lg">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <FieldLabel label="BPM" size="xs" />
          <span className="rounded bg-gray-700 px-2 py-1 font-mono text-sm text-cyan-300">{value}</span>
        </div>
        <Slider min={60} max={200} step={1} value={value} onChange={(event) => setValue(Number(event.target.value))} />
      </div>
    </Card>
  );
};

export const InterpolationSpeed: Story = () => {
  const [value, setValue] = React.useState(0.25);

  return (
    <Card className="max-w-xl bg-gray-900 text-gray-100" padding="lg">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <FieldLabel label="Interpolation speed" size="xs" />
          <span className="rounded bg-gray-700 px-2 py-1 font-mono text-sm text-cyan-300">
            {value === 0 ? "Instant" : `${value.toFixed(2)}s`}
          </span>
        </div>
        <Slider min={0} max={1} step={0.05} value={value} onChange={(event) => setValue(Number(event.target.value))} />
      </div>
    </Card>
  );
};