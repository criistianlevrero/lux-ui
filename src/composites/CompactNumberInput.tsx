import React from 'react';
import { Input } from '../primitives';

export interface CompactNumberInputProps extends Omit<React.ComponentProps<typeof Input>, 'unstyled' | 'type'> {
  type?: 'number' | 'text';
}

const compactInputStyles = 'w-full rounded border border-gray-600 bg-gray-700 px-1 py-1 text-xs text-gray-200 focus:border-cyan-500 focus:outline-none disabled:opacity-50';

export const CompactNumberInput: React.FC<CompactNumberInputProps> = ({
  type = 'number',
  className = '',
  ...props
}) => {
  return (
    <Input
      type={type}
      unstyled
      className={`${compactInputStyles} ${className}`.trim()}
      {...props}
    />
  );
};

export default CompactNumberInput;
