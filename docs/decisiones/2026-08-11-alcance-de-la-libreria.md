> **Estado**: VIGENTE · **Fecha**: 2026-08-11 · **Alcance**: `lux-ui`

# Alcance de lux-ui: qué entra, qué no, y por qué el CSS se parte en tres

Decisión tomada el 2026-08-11, a partir de los riesgos R2 y R3 de la
[auditoría de Fase 2](../auditoria/2026-08-11-auditoria-lux-ui.md).

## El problema

`src/foundation/styles.css` hacía tres trabajos a la vez:

1. Tokens de la librería (`--lux-color-*`, `--lux-font-family`) y el `@source` de Tailwind.
2. Reset y shell de aplicación: `html, body { height: 100% }`, `#root`, font smoothing,
   `body { background-color, color }`, `.container`.
3. **Dominio de la aplicación**: `@keyframes midi-learn-pulse` y `.animate-midi-learn-pulse`,
   consumidos por `luxsequencer-core/src/components/midi/MidiLearnButton.tsx`.

Como el archivo se publica entero bajo un único export `./styles.css`, la librería le imponía la
escala tipográfica raíz, el fondo y una animación de MIDI a toda app que la instalara.

## La decisión de fondo: qué es lux-ui

**lux-ui no es una librería independiente del proyecto, y no se pretende que lo sea.** Lo más
probable es que nunca tome entidad propia: es, con nombre de librería, el archivo compartido de
interfaz gráfica entre `luxsequencer-core` y `luxsequencer-cloud`. Aceptar eso explícitamente es
mejor que mantener la ficción de un paquete genérico.

De ahí salen dos criterios, en este orden:

1. **No se contamina con dominio de la aplicación.** MIDI, secuenciador, renderers, store: nada de
   eso entra. Es la línea dura.
2. **Dentro de eso, se es pragmático.** Si algo se reutiliza entre cloud y core **y** es de
   interfaz gráfica, puede vivir en lux-ui sin problema — aunque no sea "un componente" en sentido
   estricto.

**Esto es orientación, no regla.** No se aplica de forma automática: cuando aparezca algo nuevo
para agregar a la librería, se discute en ese momento. Documentarlo sirve para no volver a
discutir el marco desde cero, no para cerrar la discusión concreta por anticipado.

El criterio 2 es el que salva al `reset` y a la escala tipográfica: no son componentes, pero son
interfaz gráfica y se van a reutilizar tal cual en cloud.

## Consecuencia concreta: tres entradas en vez de una

| Entrada | Contenido | Obligatoria |
|---|---|---|
| `./styles.css` | `@source` de Tailwind + variables `--lux-*` y sus alias `--color-*` | **Sí** — los componentes no funcionan sin esto |
| `./reset.css` | `html, body { height: 100% }`, font smoothing, `font-family`, `body { background-color, color }`, `#root` | No, opt-in |
| `./typography.css` | La estrategia de escalado: `html { font-size: 12px }` | No, opt-in |

Lo que se va a `luxsequencer-core`: `@keyframes midi-learn-pulse` y `.animate-midi-learn-pulse`,
al `src/index.css` de core.

Separar `reset` de `typography` no es cosmética: hay intención declarada de usar el escalado
tipográfico tal cual en cloud, y conviene poder tomarlo sin arrastrar el resto del shell.

## Lo que esta decisión no resuelve

- **`.container`.** Es un helper de layout, no reset ni tipografía, y Tailwind v4 define su propio
  `.container`. Redefinirlo global puede colisionar. Queda sin asignar: decidir al implementar si
  se borra (Tailwind ya lo da), si va a `reset.css`, o si vuelve a las apps.
- **El `body { background-color, color }`** está en `reset.css` por ahora, pero es lo más cercano a
  "tema" que queda. Si algún día se retoma el theming (hoy archivado, ver
  [ladle-saneamiento.md](../next-steps/ladle-saneamiento.md)), es candidato a moverse.

## Trampa al implementar: es un cambio atómico cross-repo

Hoy `luxsequencer-core/src/index.css` hace un solo `@import '@luxsequencer/ui/styles.css'` y
recibe las tres cosas. Al partir el archivo, **core deja de tener reset y escala tipográfica en el
mismo commit en que se parte**, salvo que agregue los dos imports nuevos y la definición de
`midi-learn-pulse`.

El cambio toca los dos repos a la vez:

- `lux-ui`: partir `styles.css`, agregar los dos `exports` y sumar los archivos a `files` en
  `package.json`.
- `luxsequencer-core`: agregar `@import '@luxsequencer/ui/reset.css'` y
  `@import '@luxsequencer/ui/typography.css'`, más el `@keyframes midi-learn-pulse`.

`luxsequencer-cloud` no necesita nada ahora — no tiene Tailwind y su trabajo está postergado. Pero
cuando se retome, `typography.css` es lo que ahí se quiere.

Y aplica la trampa del caret en `0.x` registrada en el `CLAUDE.md` de la raíz: esto es breaking, y
si sale como `0.2.0` hay que actualizar los rangos de core y cloud en el mismo commit.

## Decisiones relacionadas tomadas el mismo día

- **Theming por variables CSS: archivado.** Las ~120 variables de `.ladle/theme.css` no las lee
  ningún componente. No se migran los 23 componentes a consumirlas; se saca el switcher fantasma
  de Ladle y se deja de prometer theming hasta que haya una necesidad concreta.
- **DaisyUI: se saca.** Ningún componente usa sus clases desde `19e957c`.
- **Republicación en npm: postergada.** Se junta el lote — este cambio es breaking, así que sale
  como `0.2.0`, no como el `0.1.1` que estaba pendiente desde el 2026-08-07.
