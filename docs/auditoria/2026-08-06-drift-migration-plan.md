> **Estado**: VIGENTE · **Fecha**: 2026-08-06 · **Última verificación**: 2026-08-11
>
> Hallazgo de la auditoría de Fase 1 (ecosistema), acotado a `lux-ui`. Vivía en
> `docs/auditoria/2026-08-06-drift-por-proyecto.md` de la raíz, marcado 🚚 pendiente de mudanza
> porque este repo todavía no tenía carpeta `docs/auditoria/`. Movido acá el 2026-08-11.
>
> Verificado de nuevo y **ampliado** en
> [2026-08-11-auditoria-lux-ui.md](2026-08-11-auditoria-lux-ui.md) § 3 (filas D1–D7).

# `MIGRATION_PLAN.md` está desactualizado hacia atrás

El caso es el inverso del drift habitual: la doc no promete de más, promete de menos. Hay tareas
marcadas `[ ]` que **ya están hechas**, lo que hace que el plan se lea como si la migración
estuviera a mitad de camino cuando en realidad está esencialmente terminada.

Tareas marcadas pendientes que están hechas:

- **Fase 1, "Reemplazar imports en `luxsequencer-core`"** → hecho.
  `luxsequencer-core/src/components/ui/primitives/index.ts` es un re-export puro de
  `@luxsequencer/ui`.
- **Fase 2 completa, "Migrar `SliderInput`, `CollapsibleSection`, `AdvancedSelect`,
  `RangeSlider`"** → los cuatro existen en `lux-ui/src/composites/`.
- **Fase 4, "Storybook con casos canónicos" y "Tests de regresión visual"** → hay stories de Ladle
  para prácticamente todos los componentes y `lux-ui/src/test/visual/` con Playwright.

El bloque "Avance actual" fechado **2026-03-03** quedó congelado.

## Ampliación verificada el 2026-08-11

La auditoría de Fase 2 confirmó las tres y encontró tres más:

- **Fase 0, "Definir nombre final del paquete"** → es `@luxsequencer/ui`, publicado en npm.
- **Fase 1, "Publicar `0.1.0-alpha`"** → se publicó `0.1.0` (no prerelease) el 2026-08-06.
- **Fase 2 se quedó corta**: además de los cuatro composites planeados hay tres que el plan nunca
  contempló — `IconActionButton`, `CompactNumberInput`, `SegmentedGroup`.

Con dos matices sobre la Fase 4:

- No es Storybook, es **Ladle**. La tarea se cumplió con otra herramienta.
- Los tests de regresión visual existen pero **fallan** (2271 px de diferencia contra el snapshot,
  verificado 2026-08-11). Marcar la tarea como hecha sin más sería el error opuesto.

## Por qué importa

El `MIGRATION_PLAN` es hoy la única fuente que describe el estado de la migración, y da una imagen
de atraso que no se corresponde con el código. Cualquiera que lo lea va a creer que faltan los
composites y que no hay stories.

**No se corrigió el archivo en esta sesión**: el `CLAUDE.md` de la raíz prohíbe arreglar
documentación sobre la marcha sin pedirlo. El drift queda registrado acá.
