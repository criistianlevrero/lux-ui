import React from 'react';

export interface SegmentedGroupProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const SegmentedGroup: React.FC<SegmentedGroupProps> = ({
  className = '',
  children,
  ...props
}) => {
  return (
    <div className={`bg-gray-900/50 p-1 rounded-lg flex gap-1 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export default SegmentedGroup;
