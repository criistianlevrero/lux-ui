import React from 'react';
import { Meta, Story } from '@ladle/react';
import { CompactNumberInput } from './CompactNumberInput';
import { ComponentDocs } from '../foundation/ladleDocs';

export default {
  title: 'Composites / CompactNumberInput',
  description: 'Compact numeric input used in dense editor rows like ColorPicker channel controls',
} satisfies Meta;

export const RgbChannels: Story = () => {
  const [r, setR] = React.useState(12);
  const [g, setG] = React.useState(180);
  const [b, setB] = React.useState(240);

  return (
    <div className="max-w-md space-y-3 bg-gray-900 p-6 text-gray-100">
      <p className="text-sm text-gray-400">RGB channel editor (ColorPicker pattern)</p>
      <div className="grid grid-cols-3 gap-1">
        <CompactNumberInput value={r} min={0} max={255} onChange={(e) => setR(Number(e.target.value))} placeholder="R" />
        <CompactNumberInput value={g} min={0} max={255} onChange={(e) => setG(Number(e.target.value))} placeholder="G" />
        <CompactNumberInput value={b} min={0} max={255} onChange={(e) => setB(Number(e.target.value))} placeholder="B" />
      </div>
    </div>
  );
};

export const HslChannels: Story = () => {
  const [h, setH] = React.useState(220);
  const [s, setS] = React.useState(70);
  const [l, setL] = React.useState(55);

  return (
    <div className="max-w-md space-y-3 bg-gray-900 p-6 text-gray-100">
      <p className="text-sm text-gray-400">HSL channel editor with disabled state sample</p>
      <div className="grid grid-cols-3 gap-1">
        <CompactNumberInput value={h} min={0} max={360} onChange={(e) => setH(Number(e.target.value))} placeholder="H" />
        <CompactNumberInput value={s} min={0} max={100} onChange={(e) => setS(Number(e.target.value))} placeholder="S" />
        <CompactNumberInput value={l} min={0} max={100} onChange={(e) => setL(Number(e.target.value))} placeholder="L" />
      </div>
      <div className="grid grid-cols-3 gap-1">
        <CompactNumberInput value={h} disabled placeholder="H" />
        <CompactNumberInput value={s} disabled placeholder="S" />
        <CompactNumberInput value={l} disabled placeholder="L" />
      </div>
    </div>
  );
};

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="CompactNumberInput"
    usage={`const [value, setValue] = React.useState(128);

<CompactNumberInput
  value={value}
  min={0}
  max={255}
  onChange={(event) => setValue(Number(event.target.value))}
/>`}
    inputs={[
      { name: "value", type: "number | string", required: false, description: "Current input value." },
      { name: "onChange", type: "(event) => void", required: false, description: "Change callback." },
      { name: "min", type: "number", required: false, description: "Minimum numeric value." },
      { name: "max", type: "number", required: false, description: "Maximum numeric value." },
      { name: "type", type: "'number' | 'text'", required: false, defaultValue: "'number'", description: "HTML input type." },
    ]}
  />
);
