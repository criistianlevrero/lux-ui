import React from "react";
import { Meta, Story } from "@ladle/react";
import { Modal } from "./Modal";
import Button from "./Button";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Primitives / Modal",
  description: "Modal dialog component with overlay",
} satisfies Meta;

export const Default: Story<typeof Modal> = () => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="primary">Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div style={{ padding: "1.5rem", color: "#111827" }}>
          <h2 style={{ margin: 0, marginBottom: "0.75rem", fontSize: "1.125rem", fontWeight: 700 }}>
            Modal Title
          </h2>
          <p style={{ margin: 0 }}>Are you sure you want to proceed?</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            <Button variant="primary" onClick={() => setOpen(false)}>Submit</Button>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Modal"
    usage={`const [open, setOpen] = React.useState(false);

<Modal isOpen={open} onClose={() => setOpen(false)} size="md">
  <div>Modal content</div>
</Modal>`}
    inputs={[
      { name: "isOpen", type: "boolean", required: true, description: "Controls modal visibility." },
      { name: "onClose", type: "() => void", required: true, description: "Called on ESC or backdrop click." },
      { name: "children", type: "ReactNode", required: true, description: "Modal body content." },
      { name: "size", type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", required: false, defaultValue: "'md'", description: "Max width preset." },
    ]}
  />
);
