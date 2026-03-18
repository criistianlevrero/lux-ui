import React from "react";
import { Meta, Story } from "@ladle/react";
import { Card } from "./Card";
import { Switch } from "./Switch";
import { ComponentDocs } from "../foundation/ladleDocs";

export default {
  title: "Primitives / Switch",
  description: "Switch stories modeled after settings rows and compact toggles in the core app",
} satisfies Meta;

export const SettingsRows: Story = () => {
  const [stats, setStats] = React.useState(true);
  const [overlay, setOverlay] = React.useState(false);

  return (
    <Card className="max-w-xl bg-gray-900 text-gray-100" padding="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-200">Show performance stats</p>
            <p className="text-sm text-gray-400">Common monitor row in the debug overlay.</p>
          </div>
          <Switch checked={stats} onChange={setStats} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-200">Show interaction overlay</p>
            <p className="text-sm text-gray-400">Secondary boolean setting with a compact row layout.</p>
          </div>
          <Switch checked={overlay} onChange={setOverlay} />
        </div>
      </div>
    </Card>
  );
};

export const CompactToggle: Story = () => {
  const [hardStop, setHardStop] = React.useState(false);

  return (
    <div className="max-w-lg bg-gray-900 p-6 text-gray-100">
      <Switch
        checked={hardStop}
        onChange={setHardStop}
        size="sm"
        label="Hard stop"
        description="Small switch used in compact gradient editor rows."
      />
    </div>
  );
};

export const DisabledState: Story = () => (
  <div className="max-w-lg bg-gray-900 p-6 text-gray-100">
    <Switch checked onChange={() => undefined} disabled label="Locked setting" description="Shown when a feature is not editable." />
  </div>
);

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="Switch"
    usage={`const [enabled, setEnabled] = React.useState(false);

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Show stats"
  description="Toggle setting"
/>`}
    inputs={[
      { name: "checked", type: "boolean", required: true, description: "Current on/off state." },
      { name: "onChange", type: "(checked: boolean) => void", required: true, description: "State update callback." },
      { name: "size", type: "'sm' | 'md'", required: false, defaultValue: "'md'", description: "Track and thumb size." },
      { name: "label", type: "string", required: false, description: "Primary row label." },
      { name: "description", type: "string", required: false, description: "Secondary helper text." },
    ]}
  />
);