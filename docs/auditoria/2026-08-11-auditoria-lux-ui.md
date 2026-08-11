> **Estado**: VIGENTE · **Última verificación**: 2026-08-11

# Auditoría de `lux-ui` — Fase 2

Sesión de auditoría por proyecto, con la metodología definida en el `CLAUDE.md` de la raíz:
código primero, documentación después; cada afirmación de la doc es una hipótesis a verificar.

Todo lo que sigue está verificado contra el código o contra comandos corridos el 2026-08-11 sobre
`main` en `9262691`, con el árbol de trabajo limpio.

## 1. Estado real ejecutado

| Gate | Comando | Resultado |
|---|---|---|
| Type-check | `npx tsc --noEmit` | exit 0, sin salida |
| Tests | `npx vitest run` | 3 archivos / 8 tests, 1.04s |
| Lint | `npx eslint . --ext ts,tsx --max-warnings 0` | sin salida |
| Build | `npm run build` (tsup) | ESM 50.35 KB · CJS 56.53 KB · DTS 9.44 KB, ~2s |
| Ladle build | `npx ladle build` | 23 stories, 0.86 MiB, 1.96s |
| Visual | `npx playwright test` | **1 failed** — 2271 px de diferencia (ratio 0.01). Ver R9: el test apunta a una story que no existe |

Los cuatro gates del `STATUS.md` de la raíz están en verde y coinciden con lo declarado. Pero el
verde tapa tres cosas:

- **El lint tiene apagada la regla que en core produce 260 warnings.**
  `@typescript-eslint/no-explicit-any: 'off'` en `eslint.config.js:47`. No es que lux-ui esté
  limpio de `any`: es que no se está midiendo.
- **El type-check cubre sólo `src`** (`tsconfig.json:15`, `"include": ["src"]`). Quedan afuera
  `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `scripts/add-ladle-docs.mjs` y
  los dos `.tsx` de `.ladle/`. Es decir: toda la infraestructura de build y preview no se
  type-checkea.
- **8 tests para 23 componentes.** Sólo `Button`, `Checkbox` e `Input` tienen `.test.tsx`.

Y hay un gate que no está en la tabla del ecosistema y **está en rojo**: el único test de
regresión visual falla.

## 2. Mapa de arquitectura desde el código

### Capas

```
src/
├── foundation/   tokens.ts (4 strings de clases) + styles.css + ladleDocs.tsx
├── primitives/   16 componentes
├── composites/   7 componentes
├── icons/        index.tsx
└── index.ts      barrel único: re-exporta las 4 capas
```

23 componentes, 23 stories (cobertura 1:1), 3 archivos de test.

`patterns/`, que el README lista en la estructura objetivo, **no existe**. Ver § 6.

### Superficie publicada

Dos entradas en `package.json` → `exports`:

| Entrada | Origen | Nota |
|---|---|---|
| `.` | `dist/index.{js,cjs}` + `dist/index.d.ts` | tsup, entry único desde `src/index.ts` |
| `./styles.css` | `src/foundation/styles.css` | **se sirve desde `src/`, no desde `dist/`** |

`peerDependencies`: `react >=18`, `react-dom >=18`, `@headlessui/react ^2.2.9`.
Headless UI lo usan sólo `Select.tsx` y `Switch.tsx`.

### Consumidores reales

| Repo | Archivos | Forma de consumo |
|---|---|---|
| `luxsequencer-core` | 5 | Indirecto: `components/ui/primitives/index.ts` y `components/ui/composites/index.ts` son re-exports puros de `@luxsequencer/ui` |
| `luxsequencer-cloud` | 6 | Import directo. Usa `Button`, `Input`, `Grid`, `Modal` |
| `core-renderers` | 0 | No lo consume |

El barrel de core es la razón por la que la migración se ve "incompleta" desde el
`MIGRATION_PLAN`: los imports de los componentes de core nunca cambiaron de path, cambió lo que
el barrel re-exporta. La migración está hecha; la doc no lo registró.

### Infraestructura de desarrollo

- **Ladle** (`.ladle/`) para previsualizar componentes, con Tailwind v4 + DaisyUI propios.
- **Playwright** (`playwright.config.ts`) levanta Ladle en 127.0.0.1:61000 y compara un snapshot.
- **`scripts/add-ladle-docs.mjs`** genera plantillas de story `Documentation`.

## 3. Tabla de drift

| # | Afirmación de la doc | Realidad en el código | Evidencia |
|---|---|---|---|
| D1 | Fase 0: "Definir nombre final del paquete" ⬜ | Es `@luxsequencer/ui` y está publicado en npm | `MIGRATION_PLAN.md:4` vs `package.json:2` |
| D2 | Fase 1: "Publicar `0.1.0-alpha`" ⬜ | Publicado `0.1.0` el 2026-08-06 | `MIGRATION_PLAN.md:11` |
| D3 | Fase 1: "Reemplazar imports en core" ⬜ | Hecho vía barrels de re-export | `MIGRATION_PLAN.md:12` vs `luxsequencer-core/src/components/ui/primitives/index.ts` |
| D4 | Fase 2 completa ⬜ (4 composites) | Los 4 existen, **más 3 no planeados**: `IconActionButton`, `CompactNumberInput`, `SegmentedGroup` | `MIGRATION_PLAN.md:23` vs `src/composites/index.ts` |
| D5 | Fase 4: "Storybook con casos canónicos" ⬜ | Hay Ladle, no Storybook, con 23/23 stories | `MIGRATION_PLAN.md:36` |
| D6 | Fase 4: "Tests de regresión visual" ⬜ | Existen, y **fallan** | `MIGRATION_PLAN.md:37` vs `src/test/visual/button.visual.spec.ts` |
| D7 | "Avance actual (2026-03-03)" | Congelado hace 5 meses | `MIGRATION_PLAN.md:17` |
| D8 | Estructura objetivo incluye `patterns/` | La carpeta no existe en lux-ui | `README.md:49` |
| D9 | Instalación: `npm link lux-ui` | El paquete es `@luxsequencer/ui` y se consume por npm workspace | `README.md:28` |
| D10 | El README no menciona `./styles.css` ni que el consumidor necesita Tailwind | Es el requisito operativo central del paquete | `README.md:16-31` |
| D11 | "Accesibilidad como requisito de entrada" | 14 de 23 componentes no tienen ni un `role`, `aria-*`, `tabIndex` ni `onKeyDown` | `README.md:41` |
| D12 | "Theming por tokens y utilidades Tailwind" | Los componentes hardcodean paleta Tailwind. Grep de `var(--` en `src/primitives` y `src/composites`: **cero resultados** | `README.md:40` |
| D13 | "DaisyUI habilitado para cubrir componentes que usan clases como `range`" | Ningún componente usa clases DaisyUI. `Slider` se reescribió custom en `19e957c` | `docs/next-steps/ladle-implementation.md:20` |
| D14 | Stories de composites: lista 4 | Hay 7 | `docs/next-steps/ladle-implementation.md:50-54` |
| D15 | "Qué sigue pendiente: nada bloqueante" | El test visual que el mismo documento describe está roto | `docs/next-steps/ladle-implementation.md:79` |
| D16 | `ladle-implementation.md` vive en `next-steps/` | No es trabajo planeado: es un informe de estado | ubicación del archivo |

## 4. Código muerto e infraestructura desconectada

### `.ladle/.ladlerc.json` es inerte

Ladle sólo carga `.ladle/components.{js,jsx,ts,tsx}` y `.ladle/config.mjs`. **Un `.ladlerc.json`
no es un archivo de configuración de Ladle.**

Prueba directa: el archivo declara `"outDir": "dist-ladle"`, y `npx ladle build` escribe en
`build/`, que es el default de Ladle. Lo mismo pasa con `strictMode`, `autoGenerateStories`,
`basePath` y los tres addons: nada de eso se aplica. El puerto 61000 funciona por otra vía,
`vite.config.ts:18`.

Consecuencia colateral: `.gitignore` ignora `build/` pero no `dist-ladle/`. Si alguien "arregla"
el `outDir` migrándolo a `config.mjs`, el build empieza a caer dentro del repo.

### `npm run ladle:preview` está roto

```
ladle build && ladle serve -p 61000 -c dist-ladle
```

`-c` es el flag de *directorio de configuración*, y `dist-ladle` no existe. (`package.json:42`)

### El theme switcher dark/light no hace nada

`.ladle/components.tsx` setea `data-theme` en `documentElement`, y `.ladle/theme.css` define un
sistema completo de variables para ambos temas (~120 variables). Ningún componente lee una sola
de esas variables. Cambiar el tema en Ladle no cambia nada del componente: sólo el fondo del
canvas.

### `daisyui` es una dependencia vestigial

Sólo la usa `.ladle/theme.css:4`, por un motivo que ya no aplica (D13). **Decidido 2026-08-11:
se saca.**

### `tokens.ts` lo usan 3 de 23 componentes

`Input`, `Switch` y `Textarea`. Los otros 20 hardcodean sus clases.

## 5. Deuda y riesgos, por impacto

### R1 — Regresión de accesibilidad y de touch en `Slider` / `RangeSlider` 🔴

La reescritura de `<input type="range">` a divs (`19e957c`) ganó control visual y perdió todo lo
que el elemento nativo daba gratis. `src/primitives/Slider.tsx:52-98`:

- Sin `role="slider"`, sin `aria-valuenow` / `aria-valuemin` / `aria-valuemax`, sin
  `aria-orientation`.
- Sin `tabIndex`: **el control no es enfocable**.
- Sin `onKeyDown`: no hay flechas, ni Home/End, ni PageUp/PageDown.
- Sólo `onMouseDown` + `mousemove`/`mouseup` en `document`. Grep de `onTouch|onPointer|touch-action`
  en todo `src`: **cero resultados**. **No funciona con el dedo.**

`RangeSlider` comparte `useSliderGeometry`, `SliderTrack` y `SliderThumb`, así que hereda las tres
cosas. Y `SliderInput`, que compone `Slider`, también.

En una app de secuenciador que se usa en tablet, "el slider no responde al dedo" no es deuda
cosmética.

**Decidido 2026-08-11**: la pérdida de a11y no fue deliberada. Hay que recuperar los parámetros de
accesibilidad y, sobre todo, el soporte touch. Ver `docs/next-steps/slider-a11y-touch.md`.

### R2 — El stylesheet publicado impone estilos de app y arrastra dominio 🔴

`src/foundation/styles.css` no es un archivo de tokens: es el `index.css` de una aplicación.
Además de las variables `--lux-color-*`, define:

| Regla | Problema |
|---|---|
| `html { font-size: 12px }` | La librería le cambia la escala tipográfica raíz a **toda app que la instale** |
| `body { background-color, color, font-family }` | Idem con el fondo y la tipografía |
| `html, body { height: 100% }`, `#root { height: 100%; min-height: 100vh }` | `#root` es un detalle del host, no de la librería |
| `.container { ... }` | Reimplementa un helper de layout de la app |
| `@keyframes midi-learn-pulse` + `.animate-midi-learn-pulse` | **Animación de dominio MIDI** |

La última es la más clara: es una animación de "aprendiendo MIDI", consumida por
`luxsequencer-core/src/components/midi/MidiLearnButton.tsx:27` y
`luxsequencer-core/src/components/controls/ControlPanel.tsx:150`. Viola la regla 2 del propio
`MIGRATION_PLAN.md:44` ("no conoce entidades de dominio") y el principio del `README.md:39`
("sin dependencias de negocio").

### R3 — Tres sistemas de tokens en paralelo, y los componentes no usan ninguno 🟠

| Sistema | Dónde | Forma | Quién lo consume |
|---|---|---|---|
| Variables de tema | `.ladle/theme.css` | `--bg-primary`, `--text-primary`, `--color-gray-*`, escalas de spacing/radius/z-index | Nadie |
| Variables de marca | `src/foundation/styles.css` | `--lux-color-*` + alias `--color-base-*` | Nadie (dentro de lux-ui) |
| Clases utilitarias | `src/foundation/tokens.ts` | 4 strings de clases Tailwind | 3 componentes |

Los 23 componentes escriben `bg-gray-700`, `border-cyan-600`, `text-gray-200` a mano. El theming
por tokens que promete el README **no está implementado**: no es una configuración pendiente, es
un rediseño pendiente. Y mientras tanto los tres sistemas pueden divergir sin que nada lo detecte.

### R4 — Ladle valida un paquete distinto del que se publica 🟠

`.ladle/theme.css` hace `@import "tailwindcss"` + `@source "../src"` + `@plugin "daisyui"` y
define sus propios globales. **Nunca importa `src/foundation/styles.css`.**

O sea: el stylesheet que reciben los consumidores no se ejercita nunca en el preview. Que
`ladle:build` pase no dice nada sobre lo que ve un consumidor.

Caso concreto y comprobable: las stories de Button en `src/primitives/Button.stories.tsx:121`,
`:202` y `:207` usan `animate-midi-learn-pulse`, que sólo está definido en `styles.css`. En Ladle
esas tres stories se ven **sin la animación**. La story documenta un comportamiento que el preview
no muestra.

Y hay una segunda divergencia: Ladle escanea `../src` mientras que el paquete declara
`@source '../../dist/**'`. Son dos superficies de clases distintas.

### R5 — El `0.1.0` publicado en npm no tiene el `@source` 🟠

Ya registrado como pendiente #1 en el `STATUS.md` de la raíz, y confirmado acá: el fix es el
commit `9262691`, **posterior** a la publicación del 2026-08-06. Todo consumidor externo que
instale `@luxsequencer/ui@0.1.0` desde npm recibe los componentes sin ninguna clase de Tailwind.

En el workspace no se nota porque el symlink entrega el archivo corregido. Es exactamente el tipo
de bug que sólo aparece fuera de casa.

### R6 — `luxsequencer-cloud` no tiene Tailwind 🟡

Verificado: no está `tailwindcss` ni `@tailwindcss/vite` en sus dependencias, su `vite.config.ts`
no carga el plugin, y su `src/index.css` **no hace `@import 'tailwindcss'`** — sólo
`@import '@luxsequencer/ui/styles.css'`.

Resultado: los componentes de lux-ui que cloud usa (`Button`, `Input`, `Grid`, `Modal`) emiten
clases de utilidad que en cloud no existen. Se renderizan sin estilo. Lo único que sí le llega es
lo que R2 describe: las variables y los globales de app.

**Decidido 2026-08-11**: cloud es un scaffold sin nada funcional todavía. Tailwind se implementa
cuando se trabaje esa parte. No es acción para esta sesión — queda registrado para no
re-descubrirlo.

Nota relacionada: si cloud llegara a usar `Select` o `Switch`, necesita `@headlessui/react`, que
es peer dependency de lux-ui y **no está en las dependencias de cloud**. Hoy resuelve por hoisting
del workspace; en una instalación suelta, rompe.

### R9 — El único test de regresión visual nunca testeó nada 🔴

*Investigado el 2026-08-11, después de la primera pasada de esta auditoría.*

`src/test/visual/button.visual.spec.ts:6` navega a `/?story=button--default`. **Ese id no existe.**
Los ids de Ladle llevan como prefijo el `title` del default export, y `Button.stories.tsx:24`
declara `title: "Primitives / Button"`. El id real es `primitives--button--default`, verificado
contra `build/meta.json`.

Lo que el test captura hoy es la página de error de Ladle: *"Story not found — The story id
`button--default` you are trying to open does not exist. Typo?"*.

Y el hallazgo que lo convierte de bug en agujero: **el snapshot commiteado tampoco tiene un
botón**. Es un canvas blanco con la barra de Ladle abajo — 4.7 KB contra los 17.8 KB de la captura
actual. La línea base se generó desde un estado ya roto. El test estuvo en verde afirmando nada,
y sólo se puso en rojo cuando la página de error empezó a renderizar a tiempo para la captura.

El `ratio 0.01` engaña: no es un detalle cosmético que se movió, es todo el contenido que apareció
donde antes había blanco.

Esto degrada el diagnóstico de la Fase 4 del `MIGRATION_PLAN` (D6): los tests de regresión visual
no están "hechos pero fallando", están **vacíos**.

→ [docs/next-steps/ladle-saneamiento.md](../next-steps/ladle-saneamiento.md)

### R7 — Cobertura de tests desproporcionada 🟡

3 de 23 componentes tienen test unitario. El único test de regresión visual falla. Los
componentes con más lógica —`Slider`, `RangeSlider`, `AdvancedSelect`, `Modal`— no tienen
ninguno.

### R8 — Sin CI, sin CHANGELOG, sin política de versiones 🟡

La Fase 0 del `MIGRATION_PLAN` ("políticas de versión y changelog", "matriz de compatibilidad")
nunca se cerró, y el paquete ya está publicado. El propio `ladle-implementation.md:84` pide CI
como mejora futura. Hoy nada impide publicar una versión con el test visual roto.

## 6. Qué pasa con `patterns/`

Los 8 componentes que el `README.md:68` clasifica como "evaluar por acoplamiento visual/contextual"
existen, **todos en `luxsequencer-core/src/components/ui/patterns/`**. Ninguno migró.

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

**Ninguno está muerto y ninguno tiene acoplamiento de dominio en sus imports**: los 8 importan
únicamente React. Contra las 4 reglas de decisión del `MIGRATION_PLAN.md:42-47`, pasan las tres
primeras sin discusión.

La que separa aguas es la regla 4, "es útil en más de una app":

- **Candidatos reales**: `Alert`, `EmptyState`, `ErrorState`. Son genéricos y cloud los va a
  necesitar apenas tenga UI de verdad — hoy cloud no tiene ninguno.
- **Mobiliario de panel de debug**: `StatTile`, `MetricCard`, `MiniChartCard`, `PanelHeader`. Se
  usan casi exclusivamente en `components/debug/`. Genéricos en su forma, pero sin un segundo
  consumidor a la vista.
- **Acoplado por nombre y por forma**: `SequencerCell`. Es el más grande y el más específico del
  producto. Se queda en core.

La evaluación que el README pedía nunca se hizo y quedó como una fase abierta indefinidamente.
Detalle en `docs/next-steps/patterns-evaluacion.md`.

## 7. Sobre Ladle: ¿vale la pena revivirlo?

**Sí, y está más vivo de lo que parece.** Conviene separar el núcleo de la periferia.

**Lo que funciona hoy, sin tocar nada:**

- `npx ladle build` corre limpio: 23 stories, 0.86 MiB, 1.96 s.
- Cobertura 1:1 — los 23 componentes exportados tienen story.
- Las stories no son genéricas: reproducen patrones reales de core (toolbar actions, renderer
  selectors, debug tabs, transport controls). Es trabajo de verdad, y es el activo más valioso del
  repo después de los componentes.
- `scripts/add-ladle-docs.mjs` genera plantillas de documentación.

**Lo que está podrido, todo en la periferia:**

| Problema | Impacto |
|---|---|
| `.ladlerc.json` inerte (§ 4) | Bajo — los defaults funcionan |
| `ladle:preview` roto (§ 4) | Bajo — `ladle:dev` sirve para lo mismo |
| Theme switcher fantasma (§ 4) | Medio — promete algo que no hace |
| DaisyUI vestigial (§ 4) | Bajo — se saca |
| **No carga `styles.css` (R4)** | **Alto — es la razón por la que el preview no es confiable** |
| Test visual roto (§ 1) | Medio — el gate existe pero no protege nada |

**Recomendación**: no hay nada que "revivir" en el sentido de reconstruir. Hay que arreglar R4
—hacer que Ladle consuma el mismo `styles.css` que reciben los consumidores— y limpiar la
periferia. Eso convierte a Ladle en lo que se instaló para ser: el lugar donde se ve el
componente **como lo va a ver el consumidor**. Sin R4 resuelto, el preview miente, que es la única
forma en que una herramienta de preview puede fallar.

Detalle en `docs/next-steps/ladle-saneamiento.md`.

## 8. Preguntas resueltas en esta sesión

| Pregunta | Respuesta (2026-08-11) |
|---|---|
| ¿La reescritura del `Slider` sacrificó a11y a propósito? | No. Fue por control visual. Se necesitan parámetros de accesibilidad y **sobre todo** touch |
| ¿Cloud sin Tailwind es bug o scaffold? | Scaffold. Nada funcional todavía. Tailwind se implementa al trabajar esa parte |
| ¿Ladle vale la pena? | Sí. Ver § 7 |
| ¿Se puede sacar DaisyUI? | Sí |
| ¿Qué pasa con `patterns/`? | Ver § 6 |

## 9. Decisiones tomadas al cierre de la sesión

Las tres preguntas que quedaban abiertas se resolvieron el mismo 2026-08-11.

| # | Pregunta | Decisión |
|---|---|---|
| 1 | `styles.css` (R2): ¿se parte? | **Sí, en tres**: `styles.css` (tokens, obligatorio), `reset.css` y `typography.css` (opt-in). El dominio MIDI se va a core. Detalle y fundamento en [2026-08-11-alcance-de-la-libreria.md](../decisiones/2026-08-11-alcance-de-la-libreria.md) |
| 2 | Tokens (R3): ¿el sistema de `.ladle/theme.css` vive? | **Archivado.** No se migran los 23 componentes a variables CSS. Se saca el switcher fantasma y se deja de prometer theming hasta que haya necesidad concreta |
| 3 | `0.1.1` (R5): ¿republicar ahora? | **Postergado.** Se junta el lote y sale como `0.2.0`, porque la partición de `styles.css` es breaking |

Y las decisiones de implementación de los riesgos:

| Riesgo | Decisión |
|---|---|
| R1 `Slider` | **Pointer Events** (`onPointerDown` + `setPointerCapture`), no `onTouch*` en paralelo. Paso de teclado `(max - min) / 100` cuando `step` no está definido |
| § 6 `patterns` | **Corte 3 / 4 / 1 aceptado**, condicionado a que la migración sea mecánica. Si aparece acoplamiento no visible en los imports, se suspende |
| § 4 DaisyUI | Se saca |

La decisión 1 trae una definición de fondo que conviene tener a mano al auditar el resto del
ecosistema: **lux-ui no es una librería independiente del proyecto y no se pretende que lo sea.**
Es el archivo compartido de interfaz gráfica entre core y cloud, con nombre de librería. La línea
dura es no contaminarlo con dominio de la aplicación; dentro de eso, lo que se reutilice entre
ambos y sea de interfaz gráfica puede vivir acá. Es orientación, no regla automática.

## 10. Preguntas que siguen abiertas

1. **`.container`**: no es reset ni tipografía, y Tailwind v4 define el suyo. ¿Se borra, va a
   `reset.css`, o vuelve a las apps? Sin asignar en la decisión de alcance.
2. **`@source` de Ladle**: escanear `dist/` es lo fiel al consumidor pero mata el hot reload.
   ¿Compromiso `src` en dev / `dist` en CI, u otra cosa?
