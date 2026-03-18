import React from "react";
import { Meta, Story } from "@ladle/react";
import Button from "./Button";
import { Overlay } from "./Overlay";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Primitives / Overlay",
  description: "Overlay states to validate modal-style backdrops and click-to-dismiss behavior",
} satisfies Meta;

export const ClickToDismiss: Story = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="relative min-h-screen bg-gray-900 p-6 text-gray-100">
      <Button variant="primary" onClick={() => setVisible(true)}>Show overlay</Button>
      <Overlay isVisible={visible} onClick={() => setVisible(false)} />
      {visible && (
        <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-2xl">
          <p className="text-lg font-semibold text-gray-100">Backdrop layer</p>
          <p className="mt-2 text-sm text-gray-400">Click the dark overlay to dismiss.</p>
        </div>
      )}
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Overlay"
    usage={`<Overlay isVisible={isOpen} onClick={() => setIsOpen(false)} zIndex={40} />`}
    inputs={[
      { name: "isVisible", type: "boolean", required: true, description: "Shows or hides the overlay." },
      { name: "onClick", type: "() => void", required: false, description: "Click handler, typically closes dialogs." },
      { name: "zIndex", type: "number", required: false, defaultValue: "40", description: "Stack order value." },
      { name: "className", type: "string", required: false, description: "Additional style classes." },
    ]}
  />
);