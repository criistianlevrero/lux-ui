# Ladle en lux-ui

## Estado actual

Ladle está operativo en `lux-ui` con:

- theming dark/light
- Tailwind v4 cargando desde `.ladle/theme.css`
- DaisyUI habilitado para componentes como `Slider`
- stories para todos los componentes exportados por `@luxsequencer/ui`
- testing visual base con Playwright

## Scripts disponibles

```bash
npm run ladle:dev
npm run ladle:build
npm run ladle:preview
npm run playwright:test
npm run playwright:test:ui
```

## Estructura actual

```text
.ladle/
  .ladlerc.json
  components.tsx
  index.html
  index.tsx
  theme.css
src/
  primitives/
    *.stories.tsx
  composites/
    *.stories.tsx
  test/
    visual/
      button.visual.spec.ts
playwright.config.ts
vite.config.ts
```

## Convenciones de stories

- usar `export default { ... } satisfies Meta;`
- colocar la story junto al componente
- modelar los escenarios según usos reales de `luxsequencer-core`
- preferir fondos, spacing y layout similares al `core`
- incluir una story `Documentation` por componente con:
  - snippet copy/paste
  - tabla de `inputs` principales (prop, tipo, required, default, descripción)

Ejemplo base:

```tsx
import { Meta, Story } from "@ladle/react";
import { MyComponent } from "./MyComponent";

export default {
  title: "Primitives / MyComponent",
  description: "Story aligned with real core usage",
} satisfies Meta;

export const Default: Story = () => <MyComponent />;

export const Documentation: Story = () => (
  <ComponentDocs
    componentName="MyComponent"
    usage={`<MyComponent />`}
    inputs={[
      { name: "value", type: "string", required: true, description: "Descripción corta" },
    ]}
  />
);
```

Helper reutilizable:

- `src/foundation/ladleDocs.tsx` (`ComponentDocs`)

## Theming y estilos

La base visual vive en `.ladle/theme.css`.

Puntos importantes:

- `@import "tailwindcss";`
- `@source "../src";` para que Tailwind escanee las stories y componentes
- `@plugin "daisyui" { themes: false; }` para componentes que dependen de clases de DaisyUI, como `Slider`
- `html { font-size: 12px; }` para acercar Ladle al contexto visual del `core`

## Testing visual

Hoy existe una base mínima de snapshot testing:

- `src/test/visual/button.visual.spec.ts`

Sirve como punto de partida para ampliar cobertura a más componentes críticos.

## Notas

- ya no existe soporte de i18n en Ladle
- no usar `export const meta`
- no existe dependencia `@ladle/playwright`; la integración se hace con `@playwright/test`
