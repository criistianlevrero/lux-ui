import React from "react";
import { Meta, Story } from "@ladle/react";
import Button from "../primitives/Button";
import { FieldLabel, Input } from "../primitives";
import { RangeSlider } from "./RangeSlider";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Composites / RangeSlider",
  description: "Dual-thumb range scenarios based on declarative range controls from the core app",
} satisfies Meta;

export const SyncedInputs: Story = () => {
  const [range, setRange] = React.useState({ min: 20, max: 80 });

  return (
    <div className="max-w-2xl space-y-4 bg-gray-900 p-6 text-gray-100">
      <FieldLabel label="Opacity range" description="Dual-thumb editor with synced min/max fields." />
      <RangeSlider min={0} max={100} step={1} value={range} onChange={setRange} />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel label="Min" size="xs" />
          <Input value={String(range.min)} onChange={(event) => setRange((current) => ({ ...current, min: Number(event.target.value) }))} />
        </div>
        <div>
          <FieldLabel label="Max" size="xs" />
          <Input value={String(range.max)} onChange={(event) => setRange((current) => ({ ...current, max: Number(event.target.value) }))} />
        </div>
      </div>
    </div>
  );
};

export const PresetRanges: Story = () => {
  const [range, setRange] = React.useState({ min: -0.5, max: 0.5 });

  return (
    <div className="max-w-2xl space-y-4 bg-gray-900 p-6 text-gray-100">
      <FieldLabel label="Normalized range" description="Preset buttons reflect the quick actions used in range control flows." />
      <RangeSlider min={-1} max={1} step={0.1} value={range} onChange={setRange} />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => setRange({ min: -1, max: 1 })}>Full range</Button>
        <Button size="sm" variant="secondary" onClick={() => setRange({ min: -0.5, max: 0.5 })}>Center</Button>
        <Button size="sm" variant="secondary" onClick={() => setRange({ min: 0, max: 1 })}>Positive only</Button>
      </div>
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="RangeSlider"
    usage={`const [range, setRange] = React.useState({ min: 20, max: 80 });

<RangeSlider
  min={0}
  max={100}
  step={1}
  value={range}
  onChange={setRange}
/>`}
    inputs={[
      { name: "min", type: "number", required: true, description: "Global minimum value." },
      { name: "max", type: "number", required: true, description: "Global maximum value." },
      { name: "value", type: "{ min: number; max: number } | [number, number]", required: true, description: "Selected range." },
      { name: "onChange", type: "(value: RangeSliderValue) => void", required: true, description: "Callback when range changes." },
      { name: "step", type: "number", required: false, description: "Drag snapping interval." },
    ]}
  />
);