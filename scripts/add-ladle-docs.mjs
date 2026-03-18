#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);

const getArg = (name) => {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  return args[index + 1];
};

const hasFlag = (name) => args.includes(name);

const storyPathArg = getArg('--story');
const componentName = getArg('--component');
const importPath = getArg('--import-path') ?? '@luxsequencer/ui';
const force = hasFlag('--force');

if (!storyPathArg || !componentName) {
  console.error(
    [
      'Usage:',
      '  npm run ladle:docs:add -- --story src/primitives/Input.stories.tsx --component Input',
      '',
      'Optional flags:',
      '  --import-path @luxsequencer/ui',
      '  --force',
    ].join('\n'),
  );
  process.exit(1);
}

const storyPath = path.resolve(process.cwd(), storyPathArg);

let source;
try {
  source = await readFile(storyPath, 'utf8');
} catch {
  console.error(`Cannot read story file: ${storyPathArg}`);
  process.exit(1);
}

if (source.includes('export const Documentation: Story')) {
  if (!force) {
    console.log(`Documentation story already exists in ${storyPathArg}. Use --force to overwrite manually.`);
    process.exit(0);
  }
}

let nextSource = source;

if (!nextSource.includes('ComponentDocs')) {
  const lines = nextSource.split('\n');
  let lastImportLine = -1;

  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].startsWith('import ')) {
      lastImportLine = index;
    }
  }

  if (lastImportLine === -1) {
    console.error('No import statements found in story file.');
    process.exit(1);
  }

  lines.splice(lastImportLine + 1, 0, 'import { ComponentDocs } from "../foundation/ladleDocs";');
  nextSource = lines.join('\n');
}

if (nextSource.includes('export const Documentation: Story') && force) {
  nextSource = nextSource.replace(/\n*export const Documentation: Story[\s\S]*$/m, '');
}

const documentationBlock = `\n\nexport const Documentation: Story = () => (\n  <ComponentDocs\n    componentName="${componentName}"\n    importPath="${importPath}"\n    usage={\`<${componentName}\n  />\`}\n    inputs={[\n      { name: "value", type: "unknown", required: false, description: "Describe the main input prop." },\n    ]}\n    notes={[\n      "Update this template with real props from the component interface.",\n    ]}\n  />\n);\n`;

nextSource = `${nextSource.trimEnd()}${documentationBlock}`;

await writeFile(storyPath, nextSource, 'utf8');

console.log(`Documentation story template added to ${storyPathArg}`);
