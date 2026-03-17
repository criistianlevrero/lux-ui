import React from "react";
import { Meta, Story } from "@ladle/react";
import Button from "./Button";

const StorySection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <section className="space-y-3 rounded-xl border border-gray-700 bg-gray-800/40 p-4">
    <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
    {children}
  </section>
);

const ResetGlyph = () => <span className="text-lg leading-none">↺</span>;
const FullscreenGlyph = () => <span className="text-lg leading-none">⛶</span>;
const SettingsGlyph = () => <span className="text-lg leading-none">⚙</span>;
const CloseGlyph = () => <span className="text-lg leading-none">✕</span>;
const MidiGlyph = () => <span className="text-sm leading-none">MIDI</span>;
const TrashGlyph = () => <span className="text-lg leading-none">🗑</span>;

export default {
  title: "Primitives / Button",
  description: "Button stories aligned with the most common LuxSequencer Core use cases",
} satisfies Meta;

export const Default: Story<typeof Button> = () => (
  <div className="min-h-screen bg-gray-900 p-4 text-gray-100">
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded-full bg-cyan-400/20 ring-1 ring-cyan-400/40" />
        <div>
          <p className="text-base font-bold text-gray-50">LuxSequencer</p>
          <p className="text-sm text-gray-400">Header actions used in the core app</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="circle"
          icon={<ResetGlyph />}
          iconOnly
          title="Reset to default"
          className="text-gray-400 hover:bg-gray-700 hover:text-white"
        />
        <Button
          variant="ghost"
          size="circle"
          icon={<FullscreenGlyph />}
          iconOnly
          aria-label="Enter fullscreen"
          className="text-gray-400 hover:bg-gray-700 hover:text-white"
        />
      </div>
    </div>
  </div>
);

export const Sizes: Story<typeof Button> = () => (
  <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
    <StorySection title="Sizes actually used in the core UI">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" variant="ghost" className="justify-start px-2 py-1 font-normal text-left hover:bg-gray-600 rounded-md">
          Pattern row action
        </Button>
        <Button size="md" variant="primary">Retry MIDI</Button>
        <Button size="icon" variant="danger" className="h-10 w-10 rounded-lg" aria-label="Delete pattern">
          <TrashGlyph />
        </Button>
        <Button size="circle" variant="ghost" icon={<SettingsGlyph />} iconOnly className="bg-gray-800/70 text-white backdrop-blur-sm hover:bg-gray-700/90" />
      </div>
    </StorySection>
  </div>
);

export const States: Story<typeof Button> = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
      <StorySection title="Interactive and stateful variants from core flows">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Submit</Button>
          <Button disabled variant="primary">Disabled</Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 2000);
            }}
          >
            {isLoading ? "Loading..." : "Click to load"}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-10 w-10 flex-shrink-0"
            title="Learn MIDI"
            aria-label="Learn MIDI"
            icon={<MidiGlyph />}
            iconOnly
          />
          <Button
            type="button"
            variant="primary"
            size="icon"
            className="h-10 w-10 flex-shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white"
            title="Mapped MIDI"
            aria-label="Mapped MIDI"
            icon={<MidiGlyph />}
            iconOnly
          />
          <Button
            type="button"
            variant="primary"
            size="icon"
            className="h-10 w-10 flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white animate-midi-learn-pulse"
            title="Learning MIDI"
            aria-label="Learning MIDI"
            icon={<MidiGlyph />}
            iconOnly
          />
        </div>
      </StorySection>
    </div>
  );
};

export const ColorVariants: Story<typeof Button> = () => (
  <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
    <StorySection title="Core visual variants">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Retry</Button>
        <Button variant="secondary">Close</Button>
        <Button variant="danger">Delete</Button>
        <Button variant="ghost">Open pattern</Button>
      </div>
    </StorySection>

    <StorySection title="Core overrides via className">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="circle" icon={<CloseGlyph />} iconOnly className="bg-gray-800/70 text-white backdrop-blur-sm hover:bg-gray-700/90" />
        <Button variant="ghost" size="sm" className="justify-start rounded-md px-2 py-1 font-normal text-left hover:bg-gray-600">Pattern Alpha</Button>
        <Button variant="danger" size="icon" className="h-10 w-10 shrink-0 rounded-lg" aria-label="Delete pattern">
          <TrashGlyph />
        </Button>
      </div>
    </StorySection>
  </div>
);

export const Accessibility: Story<typeof Button> = () => (
  <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
    <StorySection title="Accessibility checks">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Submit</Button>
        <Button variant="secondary">Cancel</Button>
        <Button aria-label="Close dialog" variant="ghost" size="circle" icon={<CloseGlyph />} iconOnly className="text-gray-400 hover:bg-gray-700 hover:text-white" />
        <Button disabled title="Feature not available">Disabled</Button>
      </div>
      <p className="text-sm text-gray-400">Use Tab to inspect focus rings and compare icon-only buttons with the core app toolbar.</p>
    </StorySection>
  </div>
);

export const CoreUsageCases: Story<typeof Button> = () => (
  <div className="min-h-screen space-y-4 bg-gray-900 p-4 text-gray-100">
    <StorySection title="Header and fullscreen overlay controls">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_5px_var(--color-cyan-400)]" />
          Overlay controls
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="circle" icon={<SettingsGlyph />} iconOnly className="bg-gray-800/70 text-white backdrop-blur-sm hover:bg-gray-700/90" />
          <Button variant="ghost" size="circle" icon={<CloseGlyph />} iconOnly className="bg-gray-800/70 text-white backdrop-blur-sm hover:bg-gray-700/90" />
          <Button variant="ghost" size="circle" icon={<ResetGlyph />} iconOnly className="bg-gray-800/70 text-white backdrop-blur-sm hover:bg-gray-700/90" />
          <Button variant="ghost" size="circle" icon={<FullscreenGlyph />} iconOnly className="bg-gray-800/70 text-white backdrop-blur-sm hover:bg-gray-700/90" />
        </div>
      </div>
    </StorySection>

    <StorySection title="Pattern row from ControlPanel">
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center rounded-lg bg-gray-700/50 p-2 space-x-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_5px_var(--color-cyan-400)]" aria-hidden="true" />
          <Button variant="ghost" size="sm" className="grow justify-start rounded-md px-2 py-1 text-left font-normal hover:bg-gray-600">
            Pattern Alpha
          </Button>
          <span className="w-12 text-center font-mono text-xs text-cyan-400">N: 64</span>
          <Button variant="primary" size="icon" className="h-10 w-10 shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white" icon={<MidiGlyph />} iconOnly aria-label="Mapped MIDI" />
          <Button variant="danger" size="icon" className="h-10 w-10 shrink-0 rounded-lg" aria-label="Delete pattern">
            <TrashGlyph />
          </Button>
        </div>

        <div className="flex items-center rounded-lg bg-gray-700/50 p-2 space-x-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-orange-400 animate-midi-learn-pulse" aria-hidden="true" />
          <Button variant="ghost" size="sm" className="grow justify-start rounded-md px-2 py-1 text-left font-normal hover:bg-gray-600">
            Pattern Beta
          </Button>
          <span className="w-12 text-center font-mono text-xs text-cyan-400">-</span>
          <Button variant="primary" size="icon" className="h-10 w-10 shrink-0 bg-orange-500 hover:bg-orange-600 text-white animate-midi-learn-pulse" icon={<MidiGlyph />} iconOnly aria-label="Learning MIDI" />
          <Button variant="danger" size="icon" className="h-10 w-10 shrink-0 rounded-lg" aria-label="Delete pattern">
            <TrashGlyph />
          </Button>
        </div>
      </div>
    </StorySection>

    <StorySection title="Alert actions and secondary flows">
      <div className="max-w-2xl rounded-xl border border-red-500/30 bg-red-950/20 p-4">
        <p className="mb-3 text-sm text-gray-300">MIDI connection failed. These are the action buttons used in the error alert inside the core app.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm">Retry</Button>
          <Button variant="secondary" size="sm">Close</Button>
        </div>
      </div>
    </StorySection>
  </div>
);
