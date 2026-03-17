import { Meta, Story } from "@ladle/react";
import { Grid } from "./Grid";

export default {
  title: "Primitives / Grid",
  description: "Responsive grid layouts for dashboard-like panels, even though the core usually uses raw Tailwind grids",
} satisfies Meta;

export const DashboardTiles: Story = () => (
  <div className="bg-gray-900 p-6 text-gray-100">
    <Grid columns={1} className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3" gap="1rem">
      {["Renderer", "Transport", "MIDI", "Sequencer", "Patterns", "Debug"].map((label) => (
        <div key={label} className="rounded-xl border border-gray-700 bg-gray-800 p-4">
          <p className="text-sm font-semibold text-gray-200">{label}</p>
          <p className="mt-2 text-sm text-gray-400">Reusable panel tile inside a responsive dashboard grid.</p>
        </div>
      ))}
    </Grid>
  </div>
);