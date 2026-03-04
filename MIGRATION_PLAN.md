# Plan de migración a lux-ui

## Fase 0 — Preparación
- [ ] Definir nombre final del paquete (`@luxsequencer/ui` recomendado).
- [ ] Definir políticas de versión y changelog.
- [ ] Definir matriz de compatibilidad (React, Tailwind, Headless UI).

## Fase 1 — Foundation + Primitives
- [x] Copiar `foundation/tokens` y establecer contrato de theming.
- [x] Migrar primitives base a `lux-ui/src/primitives`.
- [ ] Publicar versión `0.1.0-alpha`.
- [ ] Reemplazar imports en `luxsequencer-core` para usar el paquete.

Criterio de éxito:
- Type-check y tests de `luxsequencer-core` pasan con primitives importadas desde `lux-ui`.

### Avance actual (2026-03-03)
- Extraídos en `lux-ui`: `foundation/tokens` + primitives base.
- Barrels creados: `src/foundation/index.ts`, `src/primitives/index.ts`, `src/index.ts`.
- Validación local de paquete: `npm run type-check` OK en `lux-ui`.

## Fase 2 — Composites seguros
- [ ] Migrar `SliderInput`, `CollapsibleSection`, `AdvancedSelect`, `RangeSlider`.
- [ ] Revisar accesibilidad y contratos de props.
- [ ] Publicar `0.2.0-alpha`.

Criterio de éxito:
- Sin regresiones visuales en paneles principales.

## Fase 3 — Patterns y componentes borderline
- [ ] Evaluar uno por uno `patterns` para evitar acoplamiento al producto.
- [ ] Migrar solo los reutilizables entre los 3 proyectos.
- [ ] Publicar `0.3.0-alpha`.

## Fase 4 — Estabilización
- [ ] Storybook con casos canónicos.
- [ ] Tests de regresión visual.
- [ ] Documentación de migración para consumidores.
- [ ] Publicar `1.0.0`.

## Reglas de decisión para mover componentes
Mover a `lux-ui` si cumple todo:
1. No importa store/context de negocio.
2. No conoce entidades de dominio.
3. Puede documentarse con props genéricas.
4. Es útil en más de una app.

Si no cumple, se queda en la app como adapter/container.
