import { Meta, Story } from "@ladle/react";
import { FieldLabel } from "./FieldLabel";

export default {
  title: "Primitives / FieldLabel",
  description: "Field label scenarios based on sequencer and declarative controls from the core app",
} satisfies Meta;

export const CompactSequencerLabels: Story = () => (
  <div className="space-y-4 bg-gray-900 p-6 text-gray-100">
    <FieldLabel label="BPM" size="xs" labelClassName="block" />
    <FieldLabel label="Speed" size="xs" labelClassName="block" />
    <FieldLabel label="Offset" size="xs" labelClassName="block" />
  </div>
);

export const DetailedControlLabel: Story = () => (
  <div className="max-w-xl space-y-4 bg-gray-900 p-6 text-gray-100">
    <FieldLabel
      label="Property expression"
      tooltip="Supports dot notation and multiline content."
      description="Used in declarative controls to explain the effect of a field before editing it."
      required
    />
  </div>
);