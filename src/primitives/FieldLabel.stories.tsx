import { Meta, Story } from "@ladle/react";
import { FieldLabel } from "./FieldLabel";
import { ComponentDocs } from "../foundation/ladleDocs";

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

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="FieldLabel"
    usage={`<FieldLabel
  label="Property expression"
  description="Explain what this field controls"
  tooltip="Supports dot notation"
  required
/>`}
    inputs={[
      { name: "label", type: "ReactNode", required: true, description: "Main label content." },
      { name: "description", type: "ReactNode", required: false, description: "Secondary helper text." },
      { name: "tooltip", type: "string", required: false, description: "Help tooltip text." },
      { name: "required", type: "boolean", required: false, defaultValue: "false", description: "Displays required marker." },
      { name: "size", type: "'md' | 'sm' | 'xs'", required: false, defaultValue: "'sm'", description: "Label text size preset." },
    ]}
  />
);