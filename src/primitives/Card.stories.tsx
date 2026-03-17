import { Meta, Story } from "@ladle/react";
import { Card } from "./Card";

export default {
  title: "Primitives / Card",
  description: "Card layouts inspired by viewport, side panels and stats containers in the core app",
} satisfies Meta;

export const LayoutPanels: Story = () => (
  <div className="grid gap-4 bg-gray-900 p-6 text-gray-100 md:grid-cols-2">
    <Card padding="lg">
      <h3 className="mb-2 text-lg font-semibold text-gray-100">Control Panel</h3>
      <p className="text-sm text-gray-400">Default card shell used for dense panel content in desktop layouts.</p>
    </Card>
    <Card padding="lg">
      <h3 className="mb-2 text-lg font-semibold text-gray-100">Sequencer Panel</h3>
      <p className="text-sm text-gray-400">Secondary structural panel with the same border and shadow treatment.</p>
    </Card>
  </div>
);

export const SubtleViewport: Story = () => (
  <div className="bg-gray-900 p-6 text-gray-100">
    <Card tone="subtle" padding="sm" className="relative overflow-hidden">
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-gray-600 text-sm text-gray-400">
        Main viewport preview surface
      </div>
    </Card>
  </div>
);

export const MetricCards: Story = () => (
  <div className="grid gap-4 bg-gray-900 p-6 text-gray-100 md:grid-cols-3">
    {[
      ["FPS", "58.4"],
      ["MIDI Events", "12"],
      ["Dropped Frames", "0"],
    ].map(([label, value]) => (
      <Card key={label} padding="md">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="mt-2 text-2xl font-bold text-cyan-400">{value}</p>
      </Card>
    ))}
  </div>
);