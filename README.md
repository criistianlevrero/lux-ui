# lux-ui

Librería de componentes agnósticos de LuxSequencer para reutilizar en:
- `luxsequencer-core`
- proyecto de gestión de sets grabados
- marketplace

## Orquestación y uso en el monorepo LuxSequencer

Esta librería forma parte de la arquitectura de LuxSequencer, junto a:

- **luxsequencer-core**: App principal
- **core-renderers**: Renderers oficiales
- **luxsequencer-cloud**: Plataforma cloud y marketplace

### Instalación y enlace local

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Compila la librería para desarrollo local:
   ```bash
   npm run build # o npm link
   ```
3. En los proyectos que consumen lux-ui (core, cloud):
   ```bash
   npm link lux-ui # o usa path local en package.json
   ```

> Mantén adapters locales por app para i18n, analytics y side-effects.

---
## Objetivo
Centralizar primitives/composites/patterns visuales sin lógica de dominio (MIDI, store de app, renderer config específica).

## Principios
- API pública estable y versionada (`semver`).
- Sin dependencias de negocio ni acoplamiento a flujos de una app concreta.
- Theming por tokens y utilidades Tailwind.
- Accesibilidad como requisito de entrada.

## Estructura objetivo
```text
lux-ui/
├── src/
│   ├── primitives/
│   ├── composites/
│   ├── patterns/
│   ├── foundation/
│   ├── icons/
│   └── index.ts
├── package.json
├── tsconfig.json
├── MIGRATION_PLAN.md
└── README.md
```

## Alcance inicial de extracción
### Incluir primero
- `primitives`: Button, Input, Textarea, Select, Switch, Checkbox, RadioGroup, Tooltip, FieldLabel, Card, Sheet, Tabs, Slider
- `foundation`: tokens

### Incluir después
- `composites`: AdvancedSelect, RangeSlider, SliderInput, CollapsibleSection

### Evaluar por acoplamiento visual/contextual
- `patterns`: Alert, EmptyState, ErrorState, MetricCard, MiniChartCard, PanelHeader, StatTile, SequencerCell
- `composites`: ColorPicker, Vector2DPicker

## No incluir en lux-ui
- Componentes con lógica de dominio de `src/components/controls` o que dependan de store/app context.

## Integración sugerida
1. Publicar `@luxsequencer/ui`.
2. Consumir desde `luxsequencer-core` como dependencia normal.
3. Mantener adapters locales por app para i18n, analytics y side-effects.

## Documentación en Ladle (template automático)

Para agregar rápido una story `Documentation` (copy/paste + inputs) en un componente:

```bash
npm run ladle:docs:add -- --story src/primitives/Input.stories.tsx --component Input
```

También funciona para composites:

```bash
npm run ladle:docs:add -- --story src/composites/SliderInput.stories.tsx --component SliderInput
```

Opcionales:

- `--import-path @luxsequencer/ui` para cambiar el import mostrado en el snippet.
- `--force` para reemplazar la sección `Documentation` al regenerar.

Flujo recomendado:

1. Ejecutar el comando para crear la plantilla.
2. Editar `usage`, `inputs` y `notes` con los props reales del componente.
3. Validar con `npm run ladle:build`.
