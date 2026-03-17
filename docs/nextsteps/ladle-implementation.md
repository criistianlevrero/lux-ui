# Estado de implementación de Ladle en lux-ui

## Resumen

La implementación de Ladle en `lux-ui` quedó funcional y alineada con el contexto visual de `luxsequencer-core`.

## Qué está implementado

### Infraestructura

- Ladle configurado en `.ladle/`
- Vite configurado en `vite.config.ts`
- scripts de desarrollo, build y preview en `package.json`
- build validado con `npm run ladle:build`

### Estilos

- Tailwind CSS v4 activo en Ladle
- escaneo explícito de `src/` mediante `@source "../src"`
- DaisyUI habilitado para cubrir componentes que usan clases como `range`
- base visual de Ladle ajustada para parecerse al `core`
  - fondo oscuro
  - escala tipográfica raíz de `12px`
  - altura completa en canvas

### Stories

Hay stories para todos los componentes exportados actualmente:

#### Primitives

- Button
- Input
- Textarea
- Select
- Switch
- Checkbox
- RadioGroup
- Tooltip
- FieldLabel
- Card
- Sheet
- Tabs
- Slider
- Modal
- Overlay
- Grid

#### Composites

- CollapsibleSection
- SliderInput
- AdvancedSelect
- RangeSlider

## Criterio de diseño de stories

Las stories nuevas no son genéricas: toman como referencia patrones reales de `luxsequencer-core`, por ejemplo:

- toolbar actions y fullscreen controls para `Button`
- renderer/device selectors para `Select`
- settings rows para `Switch`
- declarative boolean controls para `Checkbox` y `RadioGroup`
- debug tabs para `Tabs`
- fullscreen drawers y consoles para `Sheet`
- sequencer transport y interpolation controls para `SliderInput`
- grouped searchable controls para `AdvancedSelect`
- dual-thumb numeric editors para `RangeSlider`

## Testing visual

Está creada una base inicial con Playwright:

- `src/test/visual/button.visual.spec.ts`
- snapshot inicial de botón

## Qué sigue pendiente

Nada bloqueante para usar Ladle.

Las mejoras futuras razonables son:

1. ampliar snapshots visuales a más componentes críticos
2. agregar CI para `type-check`, `lint`, `ladle:build` y `playwright:test`
3. seguir refinando stories según evolucionen los casos reales del `core`

## Decisiones importantes

- se eliminó el soporte de i18n en Ladle
- la metadata de stories usa `export default ... satisfies Meta`
- no se usa `@ladle/playwright`; la integración es con `@playwright/test`

## Comandos útiles

```bash
npm run ladle:dev
npm run ladle:build
npm run ladle:preview
npm run playwright:test
```
