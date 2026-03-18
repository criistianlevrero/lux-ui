import React from "react";
import { Meta, Story } from "@ladle/react";
import Input from "./Input";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Primitives / Input",
  description: "Text input component with states and variants",
} satisfies Meta;

export const Default: Story<typeof Input> = () => {
  const [value, setValue] = React.useState("");
  return (
    <div style={{ padding: "2rem", maxWidth: "400px" }}>
      <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>
        Input Label
      </label>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text..."
      />
      <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginTop: "0.5rem" }}>
        Helper text
      </p>
    </div>
  );
};

export const Variants: Story<typeof Input> = () => (
  <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "400px" }}>
    <div>
      <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Normal</label>
      <Input placeholder="Enter text..." />
    </div>
    <div>
      <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Small</label>
      <Input inputSize="sm" placeholder="Small input..." />
    </div>
    <div>
      <label style={{ display: "block", marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Disabled</label>
      <Input disabled placeholder="This field is disabled" />
    </div>
  </div>
);

export const Focus: Story<typeof Input> = () => (
  <div style={{ padding: "2rem", maxWidth: "400px" }}>
    <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>Press Tab to see focus ring</p>
    <Input autoFocus placeholder="Focused input..." />
  </div>
);

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Input"
    usage={`const [value, setValue] = React.useState("");

<Input
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="Enter text..."
/>`}
    inputs={[
      { name: "value", type: "string", required: false, description: "Input value in controlled mode." },
      { name: "onChange", type: "(event) => void", required: false, description: "Callback when value changes." },
      { name: "inputSize", type: "'sm' | 'md'", required: false, defaultValue: "'md'", description: "Visual size variant." },
      { name: "placeholder", type: "string", required: false, description: "Hint text when value is empty." },
      { name: "disabled", type: "boolean", required: false, defaultValue: "false", description: "Disables interaction." },
    ]}
  />
);
