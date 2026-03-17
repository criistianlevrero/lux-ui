import React from 'react';
import { Button } from '../primitives';

export interface IconActionButtonProps extends Omit<React.ComponentProps<typeof Button>, 'variant' | 'size' | 'iconOnly'> {
  tone?: 'toolbar' | 'overlay';
}

const toneStyles: Record<NonNullable<IconActionButtonProps['tone']>, string> = {
  toolbar: 'text-gray-400 hover:bg-gray-700 hover:text-white',
  overlay: 'bg-gray-800/70 text-white backdrop-blur-sm hover:bg-gray-700/90',
};

export const IconActionButton: React.FC<IconActionButtonProps> = ({
  tone = 'toolbar',
  className = '',
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="circle"
      iconOnly
      className={`${toneStyles[tone]} ${className}`.trim()}
      {...props}
    />
  );
};

export default IconActionButton;
