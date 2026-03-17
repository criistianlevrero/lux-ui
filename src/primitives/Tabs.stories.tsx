import React from "react";
import { Meta, Story } from "@ladle/react";
import { Tabs } from "./Tabs";

const items = [
  { value: "stats", label: "Stats" },
  { value: "events", label: "Events", trailing: <span className="ml-2 h-2 w-2 rounded-full bg-cyan-400" /> },
  { value: "renderer", label: "Renderer Health" },
];

export default {
  title: "Primitives / Tabs",
  description: "Controlled tabs based on the debug overlay navigation in the core app",
} satisfies Meta;

export const DebugOverlayTabs: Story = () => {
  const [active, setActive] = React.useState("stats");

  return (
    <div className="max-w-3xl bg-gray-900 p-6 text-gray-100">
      <Tabs items={items} activeValue={active} onValueChange={setActive} />
      <div className="rounded-b-xl border border-t-0 border-gray-700 bg-gray-800 p-4 text-sm text-gray-300">
        Active tab: <span className="font-mono text-cyan-400">{active}</span>
      </div>
    </div>
  );
};