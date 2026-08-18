# lux-ui

Librería de componentes agnósticos de LuxSequencer para reutilizar en:
- `luxsequencer-core`
- proyecto de gestión de sets grabados
- marketplace

## Dónde encaja este repo

`lux-ui` es la librería de componentes compartidos del ecosistema LuxSequencer, publicada como
**`@luxsequencer/ui`** en npm público (`0.1.0`, MIT). La consumen `luxsequencer-core` y
`luxsequencer-cloud`.

**La orquestación del ecosistema —topología, instalación, resolución de dependencias— vive en el
README del workspace, no acá.** Este repo se puede clonar y desarrollar suelto: no depende de
ninguno de los otros.

### Consumirla

```json
"@luxsequencer/ui": "^0.1.0"
```

Nada de `npm link`. Dentro del workspace npm enlaza la carpeta local; fuera, baja del registro.

> **Se consume desde `dist/`, no desde `src/`.** El script `prepare` la recompila en cada
> `npm install`, pero si editás las fuentes en caliente hay que rebuildear para que el consumidor
> vea el cambio.

## Objetivo
Centralizar primitives/composites/patterns visuales sin lógica de dominio (MIDI, store de app, renderer config específica).

## Principios
- API pública estable y versionada (`semver`).
- Sin dependencias de negocio ni acoplamiento a flujos de una app concreta.
- Theming por tokens y utilidades Tailwind.
- Accesibilidad como requisito de entrada.

## Estructura

```text
lux-ui/
├── src/
│   ├── primitives/     bloques base de formulario y superficie
│   ├── composites/     componentes de mayor complejidad
│   ├── foundation/     tokens y CSS
│   ├── icons/
│   ├── test/
│   └── index.ts
├── package.json
└── tsconfig.json
```

**No hay capa `patterns/`.** Una versión anterior de este README la listaba como estructura
objetivo; la evaluación de qué patterns entran, y con qué criterio, está abierta en
[`docs/next-steps/patterns-evaluacion.md`](docs/next-steps/patterns-evaluacion.md).

## Alcance

Qué entra en la librería y qué no —y por qué el CSS se parte en tres— es una decisión tomada y
documentada:
[`docs/decisiones/2026-08-11-alcance-de-la-libreria.md`](docs/decisiones/2026-08-11-alcance-de-la-libreria.md).

En corto: componentes visuales sin lógica de dominio. Nada que dependa del store, de MIDI o del
contexto de una app concreta.

> `MIGRATION_PLAN.md`, en la raíz de este repo, describe la extracción desde `luxsequencer-core`.
> **Está desactualizado hacia atrás**: marca como pendientes tareas ya hechas. Ver
> [`docs/auditoria/2026-08-06-drift-migration-plan.md`](docs/auditoria/2026-08-06-drift-migration-plan.md).

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
