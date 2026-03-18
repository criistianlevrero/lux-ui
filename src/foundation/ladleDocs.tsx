import React from 'react';

export interface ComponentDocInput {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description: string;
}

export interface ComponentDocsProps {
  componentName: string;
  importPath?: string;
  usage: string;
  inputs: ComponentDocInput[];
  notes?: string[];
}

export const ComponentDocs: React.FC<ComponentDocsProps> = ({
  componentName,
  importPath = '@luxsequencer/ui',
  usage,
  inputs,
  notes = [],
}) => {
  return (
    <div className="max-w-4xl space-y-4 bg-gray-900 p-6 text-gray-100">
      <section className="space-y-2 rounded-xl border border-gray-700 bg-gray-800/40 p-4">
        <h3 className="text-sm font-semibold text-gray-300">Copy / paste</h3>
        <pre className="overflow-x-auto rounded-lg bg-gray-950 p-3 text-xs text-gray-200">
          <code>{`import { ${componentName} } from "${importPath}";\n\n${usage}`}</code>
        </pre>
      </section>

      <section className="space-y-2 rounded-xl border border-gray-700 bg-gray-800/40 p-4">
        <h3 className="text-sm font-semibold text-gray-300">Inputs principales</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs text-gray-200">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="px-2 py-2">Prop</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Required</th>
                <th className="px-2 py-2">Default</th>
                <th className="px-2 py-2">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {inputs.map((input) => (
                <tr key={input.name} className="border-b border-gray-800 align-top">
                  <td className="px-2 py-2 font-mono text-cyan-300">{input.name}</td>
                  <td className="px-2 py-2 font-mono text-gray-300">{input.type}</td>
                  <td className="px-2 py-2">{input.required ? 'yes' : 'no'}</td>
                  <td className="px-2 py-2 font-mono text-gray-400">{input.defaultValue ?? '-'}</td>
                  <td className="px-2 py-2 text-gray-300">{input.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {notes.length > 0 && (
        <section className="space-y-2 rounded-xl border border-gray-700 bg-gray-800/40 p-4">
          <h3 className="text-sm font-semibold text-gray-300">Notas</h3>
          <ul className="list-disc space-y-1 pl-4 text-xs text-gray-300">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};
