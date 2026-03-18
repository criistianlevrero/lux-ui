import React from "react";
import { Meta, Story } from "@ladle/react";
import { FieldLabel } from "../primitives";
import { AdvancedSelect } from "./AdvancedSelect";
import { ComponentDocs } from "../foundation/ladleDocs";

const groupedOptions = [
  { value: "blend", label: "Blend Mode", description: "How layers combine", group: "Visual" },
  { value: "exposure", label: "Exposure", description: "Brightness compensation", group: "Visual" },
  { value: "midiChannel", label: "MIDI Channel", description: "Input routing", group: "Control" },
  { value: "learnMode", label: "Learn Mode", description: "Auto-map incoming notes", group: "Control" },
];

export default {
  title: "Composites / AdvancedSelect",
  description: "Advanced selection patterns based on searchable grouped controls from the core app",
} satisfies Meta;

export const SearchableGrouped: Story = () => {
  const [value, setValue] = React.useState("blend");

  return (
    <div className="max-w-xl space-y-3 bg-gray-900 p-6 text-gray-100">
      <FieldLabel label="Binding target" description="Searchable grouped selector used in declarative controls." />
      <AdvancedSelect value={value} onChange={setValue} options={groupedOptions} searchable allowGroups />
    </div>
  );
};

export const MultiSelectTags: Story = () => {
  const [value, setValue] = React.useState(["blend", "midiChannel"]);

  return (
    <div className="max-w-xl space-y-3 bg-gray-900 p-6 text-gray-100">
      <FieldLabel label="Visible metrics" description="Multi-select with tags like advanced debug filters." />
      <AdvancedSelect value={value} onChange={setValue} options={groupedOptions} searchable allowGroups multiSelect />
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="AdvancedSelect"
    usage={`const [value, setValue] = React.useState("blend");

<AdvancedSelect
  value={value}
  onChange={setValue}
  options={[{ value: "blend", label: "Blend Mode" }]}
  searchable
  allowGroups
/>`}
    inputs={[
      { name: "value", type: "any | any[]", required: true, description: "Selected value(s)." },
      { name: "onChange", type: "(value: any) => void", required: true, description: "Selection callback." },
      { name: "options", type: "AdvancedSelectOption[]", required: true, description: "Available options list." },
      { name: "searchable", type: "boolean", required: false, defaultValue: "false", description: "Enables local search input." },
      { name: "multiSelect", type: "boolean", required: false, defaultValue: "false", description: "Allows selecting multiple values." },
    ]}
  />
);