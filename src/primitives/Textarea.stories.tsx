import React from "react";
import { Meta, Story } from "@ladle/react";
import { FieldLabel } from "./FieldLabel";
import Textarea from "./Textarea";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Primitives / Textarea",
  description: "Textarea scenarios based on declarative text controls from the core app",
} satisfies Meta;

export const PathEditor: Story = () => {
  const [value, setValue] = React.useState("scene.camera.target.position");

  return (
    <div className="max-w-2xl space-y-3 bg-gray-900 p-6 text-gray-100">
      <FieldLabel
        label="Target path"
        description="Used by declarative text controls to edit nested property paths."
        tooltip="Example: scene.camera.target.position"
        required
      />
      <Textarea
        rows={4}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Enter a property path or multiline expression"
        className="w-full"
      />
      <p className="text-sm text-gray-400">Current value: {value}</p>
    </div>
  );
};

export const ValidationState: Story = () => {
  const [value, setValue] = React.useState("position.x\nposition.y\nposition.z");
  const tooLong = value.length > 48;

  return (
    <div className="max-w-2xl space-y-3 bg-gray-900 p-6 text-gray-100">
      <FieldLabel
        label="Expression"
        description="Matches the validation-heavy multiline editor patterns from the core controls."
      />
      <Textarea
        rows={5}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className={tooLong ? "w-full border-red-500 focus:border-red-400" : "w-full"}
      />
      <div className="flex items-center justify-between text-sm">
        <span className={tooLong ? "text-red-400" : "text-gray-400"}>
          {tooLong ? "Expression is too long for this field" : "Validation passes"}
        </span>
        <span className="font-mono text-gray-500">{value.length}/48</span>
      </div>
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Textarea"
    usage={`const [value, setValue] = React.useState("");

<Textarea
  rows={4}
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="Write your expression"
/>`}
    inputs={[
      { name: "value", type: "string", required: false, description: "Current textarea value." },
      { name: "onChange", type: "(event) => void", required: false, description: "Callback when content changes." },
      { name: "rows", type: "number", required: false, description: "Visible row count." },
      { name: "placeholder", type: "string", required: false, description: "Hint text while empty." },
      { name: "disabled", type: "boolean", required: false, defaultValue: "false", description: "Disables editing." },
    ]}
  />
);