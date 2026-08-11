> **Estado**: PLANEADO · **Última verificación**: 2026-08-11

# Saneamiento de Ladle

## De dónde sale

Auditoría de Fase 2, § 7 y riesgo R4
([2026-08-11-auditoria-lux-ui.md](../auditoria/2026-08-11-auditoria-lux-ui.md)).

Se evaluó si Ladle valía la pena conservarlo. **Sí**: el núcleo está sano —23/23 componentes con
story, build limpio en 1.96s, y stories que reproducen patrones reales de core en vez de casos
genéricos—. Lo que está podrido es la periferia.

No hay nada que reconstruir. Hay que arreglar una cosa que importa y limpiar cuatro que molestan.

## Lo que importa: el preview no refleja el paquete

`.ladle/theme.css` monta su propio entorno —`@import "tailwindcss"`, `@source "../src"`,
`@plugin "daisyui"` y ~120 variables de tema— y **nunca importa `src/foundation/styles.css`**, que
es el stylesheet que reciben los consumidores.

Dos divergencias concretas:

1. Ladle escanea `../src`; el paquete declara `@source '../../dist/**'`. Son dos superficies de
   clases distintas.
2. Todo lo que sólo existe en `styles.css` no se ve en Ladle. Comprobable: las stories de Button en
   `src/primitives/Button.stories.tsx:121`, `:202` y `:207` usan `animate-midi-learn-pulse`, y en
   Ladle se ven **sin la animación**.

Mientras esto siga así, que una story se vea bien no prueba nada. Es la única forma en que una
herramienta de preview puede fallar de verdad.

**Resuelto el 2026-08-11** el bloqueo que tenía: `styles.css` se parte en tres entradas
(`styles.css`, `reset.css`, `typography.css`) según
[2026-08-11-alcance-de-la-libreria.md](../decisiones/2026-08-11-alcance-de-la-libreria.md).

Ladle tiene que importar las tres, en el mismo orden en que las va a importar core, para que el
preview reproduzca el entorno del consumidor. Eso reemplaza a los globales que hoy `.ladle/theme.css`
define por su cuenta (`html`, `body`, `#root`, box-sizing), que pasan a ser duplicados y hay que
sacar.

Queda pendiente resolver el `@source`: Ladle escanea `../src` y el paquete declara
`../../dist/**`. Lo más fiel al consumidor es escanear `dist/`, pero eso obliga a rebuildear para
ver un cambio de componente y mata el hot reload. Opción de compromiso: dejar `../src` en dev y
verificar `dist/` en el build de CI.

## Limpieza de la periferia

| Qué | Acción |
|---|---|
| `.ladle/.ladlerc.json` | **Borrar.** Ladle no lee ese archivo — sólo `.ladle/components.{js,jsx,ts,tsx}` y `config.mjs`. Prueba: el build sale en `build/`, no en el `outDir: "dist-ladle"` que declara. Si alguna de sus opciones se quiere de verdad, va en un `config.mjs` |
| `.gitignore` | Si se migra el `outDir`, agregar `dist-ladle/`. Hoy sólo está `build/` |
| `npm run ladle:preview` | Roto: `-c dist-ladle` apunta a un directorio de configuración inexistente (`package.json:42`). Arreglar o borrar el script — `ladle:dev` cubre el caso |
| Theme switcher dark/light | **Sacar.** Decidido el 2026-08-11: el theming por variables CSS queda archivado. Hoy el switcher no hace nada porque ningún componente lee las ~120 variables de `.ladle/theme.css`. Se saca `globalTypes.theme` y el `data-theme` de `.ladle/components.tsx`, y se archivan las variables que no use nadie más |
| DaisyUI | **Sacar.** Ya decidido el 2026-08-11. Se instaló para clases como `range` que ningún componente usa desde que `Slider` se reescribió custom (`19e957c`) |
| `docs/next-steps/ladle-implementation.md` | Es un informe de estado, no trabajo planeado, y tiene drift verificado (auditoría § 3, D13–D16). Reubicar |

## Test visual: investigado el 2026-08-11

No era un snapshot viejo. **El test nunca testeó un botón.**

`src/test/visual/button.visual.spec.ts:6` navega a `/?story=button--default`. Ese id no existe: los
ids de Ladle llevan el `title` del default export como prefijo, y `Button.stories.tsx:24` declara
`title: "Primitives / Button"`. El id real es **`primitives--button--default`**, verificado contra
`build/meta.json`.

Lo que captura hoy el test es la página de error de Ladle:

> Story not found — The story id `button--default` you are trying to open does not exist. Typo?

Y el remate: **el snapshot commiteado tampoco tiene un botón.** Es un canvas blanco vacío con la
barra de herramientas de Ladle abajo (4.7 KB contra los 17.8 KB del actual). La línea base se
capturó de un estado ya roto, probablemente antes de que la página de error terminara de
renderizar. El test estuvo en verde afirmando nada.

Por eso el 0.01 de ratio no era "un detalle cosmético que cambió": era todo el contenido que
apareció donde antes no había nada.

**Acción**: corregir el id a `primitives--button--default`, verificar visualmente que el snapshot
nuevo tenga efectivamente un botón antes de commitearlo, y recién ahí regenerar. Regenerar primero
habría dejado el bug intacto y el gate igual de vacío.

Vale la pena revisar de paso si el fondo blanco de la captura es correcto: `.ladle/theme.css` estiliza
`[data-testid="canvas"]`, pero el test apunta a `main.ladle-main`, que no recibe el fondo oscuro.

Una vez verde y con contenido real, es candidato natural a CI junto con `type-check`, `lint` y
`ladle:build` (deuda R8).
