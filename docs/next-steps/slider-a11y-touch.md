> **Estado**: PLANEADO · **Última verificación**: 2026-08-11

# Recuperar accesibilidad y soporte touch en `Slider` / `RangeSlider`

## De dónde sale

Auditoría de Fase 2, riesgo R1
([2026-08-11-auditoria-lux-ui.md](../auditoria/2026-08-11-auditoria-lux-ui.md)).

El commit `19e957c` reescribió `Slider` de `<input type="range">` a una composición de divs para
ganar control visual. Confirmado con el autor el 2026-08-11: **la pérdida de accesibilidad no fue
deliberada**, y el soporte touch es un requisito.

## Qué está roto hoy

En `src/primitives/Slider.tsx:52-98`, y heredado por `src/composites/RangeSlider.tsx` y
`src/composites/SliderInput.tsx` a través de `useSliderGeometry`, `SliderTrack` y `SliderThumb`:

| Falta | Consecuencia |
|---|---|
| `role="slider"` | Los lectores de pantalla ven un `div` sin semántica |
| `aria-valuenow` / `aria-valuemin` / `aria-valuemax` | No se anuncia el valor ni el rango |
| `tabIndex` | **El control no es enfocable** |
| `onKeyDown` | Sin flechas, sin Home/End, sin PageUp/PageDown |
| `onTouchStart` / `onPointerDown` | **No responde al dedo.** Grep de `onTouch\|onPointer` en `src`: cero |

## Alcance

Lo que hay que tocar está concentrado en tres archivos, porque `RangeSlider` y `SliderInput`
comparten las primitivas de `Slider.tsx`:

- `src/primitives/Slider.tsx` — `SliderTrack`, `SliderThumb`, `Slider`
- `src/composites/RangeSlider.tsx` — dos thumbs, cada uno con su propio `aria-*` y su rango acotado
  por el otro
- `src/composites/SliderInput.tsx` — verificar que no duplique handlers

## Criterio de éxito

1. El slider se alcanza con Tab y se mueve con flechas, Home y End.
2. Un lector de pantalla anuncia rol, valor actual y rango.
3. Arrastrar con el dedo en una tablet mueve el thumb.
4. Tests unitarios para teclado y para el rango de `RangeSlider` — hoy ninguno de los dos tiene
   test (ver deuda R7 de la auditoría).

## Decisiones tomadas (2026-08-11)

- **Pointer Events.** `onPointerDown` + `setPointerCapture`, un solo camino de código para mouse,
  touch y lápiz. Se descartó agregar `onTouch*` en paralelo a los handlers de mouse actuales:
  habría dejado dos caminos que mantener sincronizados sobre un código que ya es frágil.

  Consecuencia buscada: desaparecen los listeners manuales sobre `document`
  (`src/primitives/Slider.tsx:158-167`). Con `setPointerCapture`, el elemento sigue recibiendo los
  eventos aunque el puntero se vaya afuera, que es exactamente lo que esos listeners emulaban a
  mano.

- **Paso con teclado**: cuando `step` no está definido, usar `(max - min) / 100`.

## Pendiente de decidir al implementar

- Si `SliderTrack` y `SliderThumb` siguen siendo exports públicos con la misma forma. Hoy salen del
  barrel (`src/primitives/index.ts:37`) y `RangeSlider` los usa. Cambiar su firma es breaking.
