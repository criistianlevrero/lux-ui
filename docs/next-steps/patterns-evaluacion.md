> **Estado**: PLANEADO · **Última verificación**: 2026-08-11

# Evaluación de la capa `patterns/`

## De dónde sale

Auditoría de Fase 2, § 6
([2026-08-11-auditoria-lux-ui.md](../auditoria/2026-08-11-auditoria-lux-ui.md)).

El `README.md:68` lista 8 componentes bajo "evaluar por acoplamiento visual/contextual", y la
Fase 3 del `MIGRATION_PLAN.md:31` pide evaluarlos "uno por uno". **Esa evaluación nunca se hizo** y
la fase quedó abierta indefinidamente. Los 8 siguen en
`luxsequencer-core/src/components/ui/patterns/`.

Este documento hace la evaluación. Lo que queda pendiente es la decisión.

## Punto de partida verificado

| Componente | Líneas | Imports | Consumidores en core |
|---|---|---|---|
| `Alert` | 38 | sólo React | `PerformanceMonitor`, `RendererErrorBoundary`, `ControlPanel` |
| `EmptyState` | 30 | sólo React | `Sequencer`, `PropertySequencer`, `MainViewport` |
| `ErrorState` | 27 | sólo React | `MainViewport` |
| `PanelHeader` | 32 | sólo React | `DebugOverlay`, `PerformanceMonitor` |
| `StatTile` | 29 | sólo React | `DebugOverlay`, `PerformanceMonitor` |
| `MetricCard` | 47 | sólo React | `PerformanceMonitor` |
| `MiniChartCard` | 49 | React + `MetricCard` | `PerformanceMonitor` |
| `SequencerCell` | 81 | sólo React | `Sequencer`, `PropertyTrackLane` |

Dos hechos que conviene fijar antes de discutir:

- **Ninguno está muerto.** Los 8 tienen consumidores reales.
- **Ninguno tiene acoplamiento de dominio en sus imports.** Los 8 importan únicamente React. No
  tocan store, context ni tipos de dominio.

Contra las 4 reglas de decisión del `MIGRATION_PLAN.md:42-47`, los 8 pasan las reglas 1, 2 y 3 sin
discusión. La que separa aguas es la 4: *"es útil en más de una app"*.

## Propuesta de corte

### Migrar a lux-ui: `Alert`, `EmptyState`, `ErrorState`

Son genéricos en forma y en nombre, chicos (27–38 líneas) y cloud los va a necesitar apenas tenga
UI de verdad — hoy no tiene ninguno de los tres. Es el caso más claro de la regla 4.

### Dejar en core por ahora: `StatTile`, `MetricCard`, `MiniChartCard`, `PanelHeader`

Genéricos en su forma, pero se usan casi exclusivamente en `components/debug/`. Sin un segundo
consumidor a la vista, migrarlos es ampliar la superficie pública de la librería a cambio de nada.
Revisar si cloud construye un dashboard: ahí `StatTile` y `MetricCard` pasan a ser candidatos
fuertes.

### Dejar en core: `SequencerCell`

El más grande (81 líneas) y el más específico del producto. El nombre ya lo dice. Se queda.

## Consecuencia para el README

Si se acepta el corte, `README.md:68` deja de ser una lista pendiente y pasa a ser tres listas
resueltas. La entrada `patterns/` de la "estructura objetivo" (`README.md:49`) sigue sin existir en
lux-ui y sólo tendría sentido crearla si se migran los tres primeros.

Nota: el `README.md` de lux-ui **no se tocó** en la sesión de auditoría por la regla del `CLAUDE.md`
de la raíz. Actualizarlo es parte de aplicar esta decisión, no de registrarla.

## Decisión tomada (2026-08-11)

**Se acepta el corte 3 / 4 / 1.** Migran `Alert`, `EmptyState` y `ErrorState` a lux-ui.

Con una condición explícita: **la migración tiene que ser sin dolor.** Los tres importan sólo
React y suman 95 líneas entre los tres, así que la expectativa es que sea mecánica. Si al hacerla
aparece acoplamiento no visible en los imports —dependencia de clases que sólo existen en el CSS de
core, props que asumen contexto del producto, estilos que no sobreviven fuera de core— **se
suspende y se espera a que exista la necesidad concreta en cloud.** No se fuerza.

Criterio de "sin dolor", para no discutirlo a mitad de camino:

1. El componente se mueve sin cambiarle la firma de props.
2. Los consumidores de core siguen funcionando cambiando sólo el import (o nada, si se re-exporta
   desde el barrel `components/ui/patterns/index.ts` como ya se hace con primitives y composites).
3. `type-check` y tests de core siguen limpios.
4. No hay que agregar nada a `styles.css` para que se vean bien.

Si los cuatro se cumplen, sigue. Si alguno falla, se revierte y se registra por qué.

## Al implementar

- Crear `src/patterns/` en lux-ui y su barrel, y engancharlo en `src/index.ts`.
- En core, dejar `components/ui/patterns/index.ts` re-exportando los tres desde `@luxsequencer/ui`
  y conservando los cinco que se quedan. Es el mismo mecanismo que ya usan
  `components/ui/primitives/index.ts` y `components/ui/composites/index.ts`.
- Los tres van con story de Ladle, como el resto de la librería (cobertura hoy 23/23).
- Actualizar `README.md:68`: deja de ser una lista pendiente y pasa a ser un corte resuelto.
