import { Meta, Story } from "@ladle/react";
import CollapsibleSection from "./CollapsibleSection";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Composites / CollapsibleSection",
  description: "Accordion sections matching ControlPanel, Sequencer and debug monitor usage in the core app",
} satisfies Meta;

export const SettingsStack: Story = () => (
  <div className="max-w-3xl bg-gray-900 p-6 text-gray-100">
    <div className="rounded-xl border border-gray-700 bg-gray-800">
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

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="CollapsibleSection"
    usage={`<CollapsibleSection title="Renderer controls" defaultOpen>
  <p>Section content</p>
</CollapsibleSection>`}
    inputs={[
      { name: "title", type: "string", required: true, description: "Section header text." },
      { name: "children", type: "ReactNode", required: true, description: "Collapsible content." },
      { name: "defaultOpen", type: "boolean", required: false, defaultValue: "false", description: "Initial expanded state." },
    ]}
  />
);