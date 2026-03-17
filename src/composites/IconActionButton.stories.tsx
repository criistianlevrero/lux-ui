import { Meta, Story } from '@ladle/react';
import { IconActionButton } from './IconActionButton';

const SettingsGlyph = () => <span className="text-lg leading-none">⚙</span>;
const CloseGlyph = () => <span className="text-lg leading-none">✕</span>;
const ResetGlyph = () => <span className="text-lg leading-none">↺</span>;
const FullscreenGlyph = () => <span className="text-lg leading-none">⛶</span>;

export default {
  title: 'Composites / IconActionButton',
  description: 'Semantic icon-only action button used for toolbar and fullscreen overlay controls',
} satisfies Meta;

export const ToolbarTone: Story = () => (
  <div className="bg-gray-900 p-6 text-gray-100">
    <div className="flex items-center gap-2 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3">
      <IconActionButton icon={<ResetGlyph />} title="Reset" aria-label="Reset" />
      <IconActionButton icon={<FullscreenGlyph />} title="Fullscreen" aria-label="Fullscreen" />
      <IconActionButton icon={<CloseGlyph />} title="Close" aria-label="Close" />
    </div>
  </div>
);

export const OverlayTone: Story = () => (
  <div className="bg-gray-900 p-6 text-gray-100">
    <div className="flex items-center gap-2">
      <IconActionButton tone="overlay" icon={<SettingsGlyph />} title="Open controls" aria-label="Open controls" />
      <IconActionButton tone="overlay" icon={<CloseGlyph />} title="Close controls" aria-label="Close controls" />
      <IconActionButton tone="overlay" icon={<ResetGlyph />} title="Reset to default" aria-label="Reset to default" />
      <IconActionButton tone="overlay" icon={<FullscreenGlyph />} title="Exit fullscreen" aria-label="Exit fullscreen" />
    </div>
  </div>
);
