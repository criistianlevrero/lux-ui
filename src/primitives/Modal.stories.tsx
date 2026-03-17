import React from "react";
import { Meta, Story } from "@ladle/react";
import { Modal } from "./Modal";
import Button from "./Button";

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
