import React, { useCallback, useMemo, useRef, useState } from 'react';
import { SliderTrack, SliderThumb, useSliderGeometry } from '../primitives/Slider';

export interface RangeSliderValue {
  min: number;
  max: number;
}

export interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: RangeSliderValue | [number, number];
  onChange: (value: RangeSliderValue) => void;
  disabled?: boolean;
  className?: string;
  trackClassName?: string;
  activeTrackClassName?: string;
}

const isRangeSliderValue = (value: RangeSliderProps['value']): value is RangeSliderValue => (
  !Array.isArray(value)
  && typeof value === 'object'
  && value !== null
  && typeof value.min === 'number'
  && typeof value.max === 'number'
);

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  disabled = false,
  className = '',
  trackClassName = '',
  activeTrackClassName = '',
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { valueToPercentage, positionToValue } = useSliderGeometry({ min, max, step, trackRef });

  const safeValue = useMemo<RangeSliderValue>(() => {
    if (Array.isArray(value) && value.length === 2) {
      return { min: Math.min(value[0], value[1]), max: Math.max(value[0], value[1]) };
    }

    if (isRangeSliderValue(value)) {
      return { min: Math.min(value.min, value.max), max: Math.max(value.min, value.max) };
    }

    return { min, max };
  }, [value, min, max]);

  const handleTrackClick = useCallback((event: React.MouseEvent) => {
    if (disabled || isDragging) {
      return;
    }

    const next = positionToValue(event.clientX);
    const minDistance = Math.abs(next - safeValue.min);
    const maxDistance = Math.abs(next - safeValue.max);

    if (minDistance < maxDistance) {
      onChange({ min: next, max: safeValue.max });
    } else {
      onChange({ min: safeValue.min, max: next });
    }
  }, [disabled, isDragging, onChange, positionToValue, safeValue.max, safeValue.min]);

  const handleMouseDown = useCallback((event: React.MouseEvent, handle: 'min' | 'max') => {
    if (disabled) {
      return;
    }

    setIsDragging(handle);
    event.preventDefault();
  }, [disabled]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isDragging || disabled) {
      return;
    }

    const next = positionToValue(event.clientX);

    if (isDragging === 'min') {
      onChange({ min: Math.min(next, safeValue.max), max: safeValue.max });
      return;
    }

    onChange({ min: safeValue.min, max: Math.max(next, safeValue.min) });
  }, [disabled, isDragging, onChange, positionToValue, safeValue.max, safeValue.min]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minPercentage = valueToPercentage(safeValue.min);
  const maxPercentage = valueToPercentage(safeValue.max);

  return (
    <div className={className}>
      <SliderTrack
        trackRef={trackRef}
        onClick={handleTrackClick}
        disabled={disabled}
        className={trackClassName}
      >
        <div
          className={['absolute h-2 rounded-full bg-cyan-600', activeTrackClassName].join(' ').trim()}
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />
        <SliderThumb
          percentage={minPercentage}
          onMouseDown={(event) => handleMouseDown(event, 'min')}
          isDragging={isDragging === 'min'}
          disabled={disabled}
        />
        <SliderThumb
          percentage={maxPercentage}
          onMouseDown={(event) => handleMouseDown(event, 'max')}
          isDragging={isDragging === 'max'}
          disabled={disabled}
        />
      </SliderTrack>
    </div>
  );
};

export default RangeSlider;
