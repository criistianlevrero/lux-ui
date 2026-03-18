import React from 'react';
import { Meta, Story } from '@ladle/react';
import { Button } from '../primitives';
import { SegmentedGroup } from './SegmentedGroup';
import { ComponentDocs } from '../foundation/ladleDocs';

export default {
  title: 'Composites / SegmentedGroup',
  description: 'Segmented button group used for sequencer step selectors',
} satisfies Meta;

const StepSelectorButton: React.FC<{
  current: number;
  value: number;
  onSelect: (value: number) => void;
}> = ({ current, value, onSelect }) => (
  <Button
    variant={current === value ? 'primary' : 'secondary'}
    size="sm"
    onClick={() => onSelect(value)}
  >
    {value}
  </Button>
);

export const SequencerStepGroups: Story = () => {
  const [steps, setSteps] = React.useState(16);

  return (
    <div className="space-y-3 bg-gray-900 p-6 text-gray-100">
      <p className="text-sm text-gray-400">Pattern copied from Sequencer step count controls</p>
      <div className="flex flex-wrap gap-2">
        <SegmentedGroup>
          <StepSelectorButton current={steps} value={8} onSelect={setSteps} />
          <StepSelectorButton current={steps} value={16} onSelect={setSteps} />
          <StepSelectorButton current={steps} value={32} onSelect={setSteps} />
        </SegmentedGroup>
        <SegmentedGroup>
          <StepSelectorButton current={steps} value={6} onSelect={setSteps} />
          <StepSelectorButton current={steps} value={12} onSelect={setSteps} />
          <StepSelectorButton current={steps} value={24} onSelect={setSteps} />
        </SegmentedGroup>
      </div>
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="SegmentedGroup"
    usage={`<SegmentedGroup>
  <Button size="sm" variant="primary">8</Button>
  <Button size="sm" variant="secondary">16</Button>
</SegmentedGroup>`}
    inputs={[
      { name: "children", type: "ReactNode", required: false, description: "Segment items, usually buttons." },
      { name: "className", type: "string", required: false, description: "Extra wrapper classes." },
    ]}
  />
);
