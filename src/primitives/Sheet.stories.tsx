import React from "react";
import { Meta, Story } from "@ladle/react";
import Button from "./Button";
import { Sheet } from "./Sheet";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Primitives / Sheet",
  description: "Drawer and console sheet scenarios based on fullscreen layout usage in the core app",
} satisfies Meta;

export const LeftControlDrawer: Story = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <Button variant="primary" onClick={() => setOpen((current) => !current)}>
        {open ? "Close drawer" : "Open drawer"}
      </Button>
      <Sheet side="left" open={open} className="w-full max-w-md">
        <div className="h-full space-y-4 p-4 text-gray-200">
          <h3 className="text-lg font-semibold">Control Panel</h3>
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-3 text-sm text-gray-400">
            This mirrors the left settings drawer used in fullscreen mode.
          </div>
        </div>
      </Sheet>
    </div>
  );
};

export const BottomConsole: Story = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-100">
      <Button variant="secondary" onClick={() => setOpen((current) => !current)}>
        Toggle console
      </Button>
      <Sheet side="bottom" open={open} style={{ maxHeight: "40vh" }}>
        <div className="container mx-auto space-y-2 p-4 text-sm text-gray-300">
          <p className="font-semibold text-gray-100">MIDI Console</p>
          <p>[12:03:14] Connected to Launchpad Mini</p>
          <p>[12:03:17] Note On: C3 velocity 84</p>
          <p>[12:03:19] Pattern mapped to note 64</p>
        </div>
      </Sheet>
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Sheet"
    usage={`<Sheet open={open} side="left" className="w-full max-w-md">
  <div>Drawer content</div>
</Sheet>`}
    inputs={[
      { name: "open", type: "boolean", required: true, description: "Controls open/closed transform state." },
      { name: "side", type: "'left' | 'right' | 'top' | 'bottom'", required: false, defaultValue: "'left'", description: "Slide direction." },
      { name: "children", type: "ReactNode", required: false, description: "Sheet content." },
      { name: "className", type: "string", required: false, description: "Additional classes for size/layout." },
    ]}
  />
);