# Estado de @luxsequencer/ui

**Última verificación**: 2026-08-11 · **Protocolo**: ver `STATUS-PROTOCOL.md` del directorio raíz.

Vocabulario: `IMPLEMENTADO` · `PARCIAL` · `PLANEADO` · `DESCARTADO`.
Toda fila `IMPLEMENTADO` o `PARCIAL` **debe citar un archivo**.

Auditoría completa: [docs/auditoria/2026-08-11-auditoria-lux-ui.md](docs/auditoria/2026-08-11-auditoria-lux-ui.md).

## Decisiones vigentes

| Decisión | Fecha |
|---|---|
| [Alcance de la librería y partición del CSS en tres entradas](docs/decisiones/2026-08-11-alcance-de-la-libreria.md) | 2026-08-11 |

**lux-ui no es una librería independiente del proyecto y no se pretende que lo sea.** Es el archivo
compartido de interfaz gráfica entre core y cloud. No se contamina con dominio de la aplicación;
dentro de eso, lo que se reutilice entre ambos y sea de interfaz gráfica puede vivir acá. Es
orientación, no regla automática: cada agregado se discute cuando aparece.

## Verificación ejecutada

| Comando | Resultado | Fecha |
|---|---|---|
| `npx tsc --noEmit` | limpio (cubre sólo `src/`) | 2026-08-11 |
| `npx vitest run` | 8/8 en 3 archivos, 1.04s | 2026-08-11 |
| `npx eslint . --ext ts,tsx --max-warnings 0` | limpio (con `no-explicit-any` apagado) | 2026-08-11 |
| `npm run build` | limpio: ESM 50.35 KB · CJS 56.53 KB · DTS 9.44 KB | 2026-08-11 |
| `npx ladle build` | limpio: 23 stories, 0.86 MiB, 1.96s | 2026-08-11 |
| `npx playwright test` | **1 falla / 1** — 2271 px de diferencia. Diagnosticado: apunta a una story inexistente y captura la página de error | 2026-08-11 |

## Capacidades

| Capacidad | Estado | Evidencia | Notas |
|---|---|---|---|
| Primitives | IMPLEMENTADO | `src/primitives/` | 16 componentes, todos exportados en el barrel |
| Composites | IMPLEMENTADO | `src/composites/` | 7 componentes. 3 más de los que planeaba el `MIGRATION_PLAN` |
| Icons | IMPLEMENTADO | `src/icons/index.tsx` | |
| Build dual ESM + CJS + tipos | IMPLEMENTADO | `package.json` → `build` (tsup), `exports` | Entry único desde `src/index.ts` |
| Publicado en npm | IMPLEMENTADO | `package.json` → `publishConfig` | `0.1.0`, MIT, 2026-08-06 |
| Consumido por `luxsequencer-core` | IMPLEMENTADO | `luxsequencer-core/src/components/ui/primitives/index.ts` | Vía barrels de re-export |
| Consumido por `luxsequencer-cloud` | PARCIAL | `luxsequencer-cloud/src/components/index.ts` | Usa 4 componentes, pero cloud no tiene Tailwind: se renderizan sin estilo |
| Stylesheet distribuible | PARCIAL | `src/foundation/styles.css` | El `@source` es posterior a la publicación: el `0.1.0` de npm no lo tiene. Además arrastra globales de app y dominio MIDI. **Se parte en tres** (decisión 2026-08-11) |
| `reset.css` como entrada aparte | PLANEADO | — | Hoy va dentro de `styles.css`. Ver [decisión](docs/decisiones/2026-08-11-alcance-de-la-libreria.md) |
| `typography.css` como entrada aparte | PLANEADO | — | Escalado tipográfico, opt-in. Hay intención de usarlo tal cual en cloud |
| Theming por tokens | PARCIAL | `src/foundation/tokens.ts` | 4 strings de clases, usados por 3 de 23 componentes. Ningún componente lee variables CSS |
| Sistema de variables de tema (dark/light) | DESCARTADO | `.ladle/theme.css` | ~120 variables que ningún componente consume. **Archivado el 2026-08-11**: no se migran los 23 componentes. Se saca el switcher de Ladle |
| Preview de componentes en Ladle | PARCIAL | `.ladle/`, `src/**/*.stories.tsx` | 23/23 stories y build limpio, pero no carga `src/foundation/styles.css`: el preview no refleja lo que ve el consumidor |
| Configuración de Ladle vía `.ladlerc.json` | DESCARTADO | `.ladle/.ladlerc.json` | **Inerte**: Ladle no lee ese archivo. Prueba: el build sale en `build/`, no en el `outDir` declarado |
| Script `ladle:preview` | PARCIAL | `package.json:42` | Roto: `-c dist-ladle` apunta a un directorio de configuración que no existe |
| Generador de docs de stories | IMPLEMENTADO | `scripts/add-ladle-docs.mjs` | |
| Tests unitarios | PARCIAL | `src/primitives/{Button,Checkbox,Input}.test.tsx` | 3 de 23 componentes |
| Tests de regresión visual | DESCARTADO | `src/test/visual/button.visual.spec.ts` | **No testea nada.** Apunta a `button--default`, id inexistente; el real es `primitives--button--default`. Captura la página de error de Ladle, y el snapshot base es un canvas vacío. Se reconstruye, no se regenera |
| Accesibilidad | PARCIAL | `src/composites/AdvancedSelect.tsx`, `src/primitives/Tabs.tsx`, `src/primitives/Modal.tsx` | 14 de 23 componentes sin un solo `role`, `aria-*`, `tabIndex` ni `onKeyDown` |
| Soporte touch | PLANEADO | — | Cero `onTouch`/`onPointer` en todo `src`. Ver [docs/next-steps/slider-a11y-touch.md](docs/next-steps/slider-a11y-touch.md) |
| Capa `patterns/` | PLANEADO | — | Corte 3/4/1 decidido el 2026-08-11: migran `Alert`, `EmptyState`, `ErrorState`. Los otros 5 se quedan en core. Ver [docs/next-steps/patterns-evaluacion.md](docs/next-steps/patterns-evaluacion.md) |
| DaisyUI | DESCARTADO | `.ladle/theme.css:4` | Ningún componente usa sus clases desde que `Slider` se reescribió custom (`19e957c`). Decidido sacarlo 2026-08-11 |
| CI | PLANEADO | — | No existe. Nada impide publicar con el test visual roto |
| CHANGELOG y política de versiones | PLANEADO | — | Fase 0 del `MIGRATION_PLAN`, nunca cerrada. El paquete ya está publicado |
| README recortado al protocolo | PLANEADO | — | `README.md` describe estructura y flujos que no existen. Ver auditoría § 3, D8–D12 |

## Deuda crítica

1. **`Slider` y `RangeSlider` no son operables por teclado ni por touch.**
   Sin `role`, sin `aria-value*`, sin `tabIndex`, sin `onKeyDown`, y sólo con handlers de mouse
   (`src/primitives/Slider.tsx:52-98`). `SliderInput` y `RangeSlider` heredan las tres cosas.
   En una app que se usa en tablet, el control no responde al dedo.
   → [docs/next-steps/slider-a11y-touch.md](docs/next-steps/slider-a11y-touch.md)

2. **El `0.1.0` publicado en npm entrega componentes sin estilos.**
   El `@source` de Tailwind es el commit `9262691`, posterior a la publicación. En el workspace no
   se nota porque el symlink entrega el archivo corregido. Ya registrado como pendiente #1 en el
   `STATUS.md` de la raíz.

3. **El preview no refleja el paquete.**
   `.ladle/theme.css` nunca importa `src/foundation/styles.css` y escanea `../src` en vez de
   `dist/`. Que una story se vea bien en Ladle no prueba nada sobre el consumidor.
   → [docs/next-steps/ladle-saneamiento.md](docs/next-steps/ladle-saneamiento.md)

4. **El único test de regresión visual está vacío.**
   Apunta a una story que no existe y su snapshot base es un canvas en blanco. Estuvo en verde
   afirmando nada. No alcanza con regenerarlo: hay que corregir el id y verificar que la captura
   nueva tenga efectivamente un botón.
   → [docs/next-steps/ladle-saneamiento.md](docs/next-steps/ladle-saneamiento.md)

## Deuda no crítica

- **`styles.css` mezcla tres cosas**: tokens de librería, globales de app (`html { font-size: 12px }`,
  `body`, `#root`, `.container`) y dominio MIDI (`@keyframes midi-learn-pulse`). La librería le
  impone la escala tipográfica raíz y el fondo a toda app que la instale.
  **Resuelto en decisión, pendiente de implementar**: se parte en tres entradas y el MIDI vuelve a
  core. Es un cambio atómico cross-repo — ver la trampa en la
  [decisión](docs/decisiones/2026-08-11-alcance-de-la-libreria.md).
- **`.container` sin destino asignado**: no es reset ni tipografía, y Tailwind v4 define el suyo.
  Decidir al implementar la partición.
- **Tres sistemas de tokens en paralelo** —`.ladle/theme.css`, `styles.css`, `tokens.ts`— sin nada
  que impida que diverjan, y los componentes no usan ninguno de forma consistente. El primero
  queda archivado por decisión del 2026-08-11.
- **El type-check cubre sólo `src`** (`tsconfig.json:15`): `vite.config.ts`, `vitest.config.ts`,
  `playwright.config.ts`, `scripts/` y `.ladle/*.tsx` no se verifican.
- **El lint tiene `@typescript-eslint/no-explicit-any` apagado** (`eslint.config.js:47`). Limpio no
  significa sin `any`: significa que no se está midiendo.
- **`.gitignore` ignora `build/` pero no `dist-ladle/`.** Si alguien migra el `outDir` a un
  `config.mjs` que Ladle sí lea, el build empieza a caer dentro del repo.
- **`@headlessui/react` es peer dependency** (usado por `Select` y `Switch`) y no está en las
  dependencias de cloud. Hoy resuelve por hoisting del workspace; en instalación suelta, rompe.
- **`docs/next-steps/ladle-implementation.md` no es trabajo planeado**: es un informe de estado, y
  tiene drift (ver auditoría § 3, D13–D16). Ubicación a corregir.
