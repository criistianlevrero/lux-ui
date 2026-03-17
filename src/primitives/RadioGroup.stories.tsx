import React from "react";
import { Meta, Story } from "@ladle/react";
import { FieldLabel } from "./FieldLabel";
import { RadioGroup } from "./RadioGroup";

export default {
  title: "Primitives / RadioGroup",
  description: "Radio groups based on yes/no boolean choices from the core toggle controls",
} satisfies Meta;

const booleanOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const YesNoChoice: Story = () => {
  const [value, setValue] = React.useState("yes");

  return (
    <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
      <FieldLabel label="Quantize note start" description="Typical boolean selection rendered as radios in declarative controls." />
      <RadioGroup name="quantize" value={value} onChange={setValue} options={booleanOptions} />
    </div>
  );
};

export const DisabledGroup: Story = () => (
  <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
    <FieldLabel label="Render offline" description="Disabled while the engine is busy." />
    <RadioGroup name="offline-render" value="no" onChange={() => undefined} options={booleanOptions} disabled />
  </div>
);