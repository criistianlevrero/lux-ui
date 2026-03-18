import React from "react";
import { Meta, Story } from "@ladle/react";
import { Card } from "./Card";
import { FieldLabel } from "./FieldLabel";
import { Select } from "./Select";
import { ComponentDocs } from "../foundation/ladleDocs";

const languageOptions = [
  { value: "en", label: "English", icon: <span className="text-base">🇺🇸</span> },
  { value: "es", label: "Español", icon: <span className="text-base">🇪🇸</span> },
];

const rendererOptions = [
  { value: "concentric", label: "Concentric", description: "CPU-based geometric renderer" },
  { value: "webgl", label: "WebGL", description: "GPU accelerated renderer" },
  { value: "dvd", label: "DVD Screensaver", description: "Bouncing logo playground" },
];

export default {
  title: "Primitives / Select",
  description: "Select scenarios based on language, renderer and device selectors from the core app",
} satisfies Meta;

export const HeaderSelector: Story = () => {
  const [value, setValue] = React.useState("en");

  return (
    <div className="bg-gray-900 p-6 text-gray-100">
      <div className="mx-auto flex max-w-4xl items-center justify-between rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 backdrop-blur-sm">
        <div>
          <p className="text-sm text-gray-400">Header locale selector</p>
          <p className="text-base font-semibold text-gray-100">Same compact usage as the app header</p>
        </div>
        <div className="min-w-[10rem]">
          <Select value={value} onChange={(next) => setValue(String(next))} options={languageOptions} variant="header" size="sm" />
        </div>
      </div>
    </div>
  );
};

export const RendererSelector: Story = () => {
  const [value, setValue] = React.useState("webgl");

  return (
    <Card className="max-w-xl bg-gray-900 text-gray-100" padding="lg">
      <div className="space-y-3">
        <FieldLabel label="Renderer" description="Full-width options-based selector used in control panels." />
        <Select value={value} onChange={(next) => setValue(String(next))} options={rendererOptions} fullWidth />
      </div>
    </Card>
  );
};

export const NativeOptions: Story = () => {
  const [value, setValue] = React.useState("velocity");

  return (
    <div className="max-w-lg space-y-3 bg-gray-900 p-6 text-gray-100">
      <FieldLabel label="Property lane" description="Children-based select pattern used in form flows." />
      <Select value={value} onChange={(next) => setValue(String(next))} placeholder="Select a property" fullWidth>
        <option value="velocity">Velocity</option>
        <option value="opacity">Opacity</option>
        <option value="rotation" disabled>Rotation (locked)</option>
      </Select>
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Select"
    usage={`const [value, setValue] = React.useState("webgl");

<Select
  value={value}
  onChange={(next) => setValue(String(next))}
  options={[{ value: "webgl", label: "WebGL" }]}
  fullWidth
/>`}
    inputs={[
      { name: "value", type: "string | number", required: true, description: "Currently selected value." },
      { name: "onChange", type: "(value: string | number) => void", required: true, description: "Selection callback." },
      { name: "options", type: "SelectOption[]", required: false, description: "Options list for Listbox mode." },
      { name: "placeholder", type: "string", required: false, defaultValue: "'Seleccionar...'", description: "Placeholder text when no value is selected." },
      { name: "fullWidth", type: "boolean", required: false, defaultValue: "false", description: "Expand component to container width." },
    ]}
  />
);