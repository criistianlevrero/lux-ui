import React from "react";
import { Meta, Story } from "@ladle/react";
import Tooltip from "./Tooltip";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Primitives / Tooltip",
  description: "Tooltip stories modeled after help badges used indirectly through FieldLabel in the core app",
} satisfies Meta;

export const HelpBadge: Story = () => (
  <div className="flex min-h-[16rem] items-center justify-center bg-gray-900 p-6 text-gray-100">
    <Tooltip content="Explains what this control does when hovered or focused.">
      <button type="button" className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-sm text-gray-200">?</button>
    </Tooltip>
  </div>
);

export const LongCopy: Story = () => (
  <div className="flex min-h-[16rem] items-center justify-center bg-gray-900 p-6 text-gray-100">
    <Tooltip
      content="Use grouped search when the list is large. This matches the kind of descriptive help surfaced in advanced declarative controls."
      contentClassName="max-w-xs whitespace-normal text-left"
    >
      <button type="button" className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 hover:border-gray-500">
        Focus or hover me
      </button>
    </Tooltip>
  </div>
);

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Tooltip"
    usage={`<Tooltip content="Additional help text">
  <button type="button">?</button>
</Tooltip>`}
    inputs={[
      { name: "content", type: "ReactNode", required: true, description: "Tooltip content." },
      { name: "children", type: "ReactNode", required: true, description: "Trigger element." },
      { name: "contentClassName", type: "string", required: false, description: "Extra classes for tooltip body." },
      { name: "className", type: "string", required: false, description: "Extra classes for wrapper." },
    ]}
  />
);