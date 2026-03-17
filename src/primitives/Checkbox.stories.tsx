import React from "react";
import { Meta, Story } from "@ladle/react";
import Checkbox from "./Checkbox";

export default {
  title: "Primitives / Checkbox",
  description: "Checkbox states inspired by boolean declarative controls in the core app",
} satisfies Meta;

export const BooleanControl: Story = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <div className="max-w-lg space-y-2 bg-gray-900 p-6 text-gray-100">
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label={(
          <span>
            Enable loop mode
            <span className="mt-1 block text-sm text-gray-400">Boolean option displayed in toggle-based declarative controls.</span>
          </span>
        )}
        className="items-start"
      />
    </div>
  );
};

export const States: Story = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
      <Checkbox checked={checked} onChange={setChecked} label="Unchecked / interactive" />
      <Checkbox checked onChange={() => undefined} label="Checked" />
      <Checkbox checked={false} onChange={() => undefined} disabled label="Disabled" />
    </div>
  );
};