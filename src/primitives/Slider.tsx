import React, { useCallback, useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Shared geometry hook — used by Slider and RangeSlider
// ---------------------------------------------------------------------------

export function useSliderGeometry({
  min,
  max,
  step,
  trackRef,
}: {
  min: number;
  max: number;
  step?: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  const valueToPercentage = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max],
  );

  const positionToValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      let next = min + ratio * (max - min);
      if (step && step > 0) {
        next = Math.round(next / step) * step;
      }
      return Math.max(min, Math.min(max, next));
    },
    [min, max, step, trackRef],
  );

  return { valueToPercentage, positionToValue };
}

// ---------------------------------------------------------------------------
// SliderTrack — shared presentational container
// ---------------------------------------------------------------------------

export interface SliderTrackProps {
  trackRef: React.RefObject<HTMLDivElement | null>;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const SliderTrack: React.FC<SliderTrackProps> = ({
  trackRef,
  onClick,
  disabled = false,
  className = '',
  children,
}) => (
  <div
    ref={trackRef}
    className={[
      'relative h-2 cursor-pointer rounded-full bg-gray-700',
      disabled ? 'cursor-not-allowed opacity-50' : '',
      className,
    ].join(' ').trim()}
    onClick={onClick}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// SliderThumb — shared presentational handle
// ---------------------------------------------------------------------------

export interface SliderThumbProps {
  percentage: number;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  isDragging?: boolean;
  disabled?: boolean;
}

export const SliderThumb: React.FC<SliderThumbProps> = ({
  percentage,
  onMouseDown,
  isDragging = false,
  disabled = false,
}) => (
  <div
    className={[
      'absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-cyan-600 bg-white shadow-md',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-grab hover:scale-110',
      isDragging ? 'scale-125 cursor-grabbing ring-4 ring-cyan-500/30' : '',
    ].join(' ').trim()}
    style={{ left: `${percentage}%` }}
    onMouseDown={onMouseDown}
  />
);

// ---------------------------------------------------------------------------
// Slider — single-thumb slider built on the shared primitives
// ---------------------------------------------------------------------------

export interface SliderProps {
  id?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
  trackClassName?: string;
}

export const Slider: React.FC<SliderProps> = ({
  id,
  min,
  max,
  step,
  value,
  onChange,
  disabled = false,
  className = '',
  trackClassName = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const { valueToPercentage, positionToValue } = useSliderGeometry({ min, max, step, trackRef });

  const handleTrackClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled || isDragging) return;
      onChange(positionToValue(event.clientX));
    },
    [disabled, isDragging, onChange, positionToValue],
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      event.preventDefault();
    },
    [disabled],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || disabled) return;
      onChange(positionToValue(event.clientX));
    },
    [isDragging, disabled, onChange, positionToValue],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const percentage = valueToPercentage(value);

  return (
    <div id={id} className={className}>
      <SliderTrack
        trackRef={trackRef}
        onClick={handleTrackClick}
        disabled={disabled}
        className={trackClassName}
      >
        <SliderThumb
          percentage={percentage}
          onMouseDown={handleMouseDown}
          isDragging={isDragging}
          disabled={disabled}
        />
      </SliderTrack>
    </div>
  );
};

Slider.displayName = 'Slider';

export default Slider;
