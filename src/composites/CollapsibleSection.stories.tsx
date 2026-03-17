import { Meta, Story } from "@ladle/react";
import CollapsibleSection from "./CollapsibleSection";

export default {
  title: "Composites / CollapsibleSection",
  description: "Accordion sections matching ControlPanel, Sequencer and debug monitor usage in the core app",
} satisfies Meta;

export const SettingsStack: Story = () => (
  <div className="max-w-3xl bg-gray-900 p-6 text-gray-100">
    <div className="rounded-xl border border-gray-700 bg-gray-800 px-4">
      <CollapsibleSection title="Renderer controls" defaultOpen>
        <p className="text-sm text-gray-400">Primary renderer configuration block.</p>
      </CollapsibleSection>
      <CollapsibleSection title="Saved patterns">
        <p className="text-sm text-gray-400">Collapsed pattern management group.</p>
      </CollapsibleSection>
      <CollapsibleSection title="Performance diagnostics" defaultOpen>
        <p className="text-sm text-gray-400">Alert-driven section that starts open in debug workflows.</p>
      </CollapsibleSection>
    </div>
  </div>
);