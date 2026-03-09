import { ReactNode } from 'react';

export interface GridProps {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: string;
  children: ReactNode;
  className?: string;
}

export function Grid({ columns = 1, gap = '1rem', children, className }: GridProps) {
  const getGridCols = (cols: number | { sm?: number; md?: number; lg?: number; xl?: number }) => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }

    const classes = [];
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);

    return classes.join(' ');
  };

  return (
    <div
      className={`grid ${getGridCols(columns)} ${className || ''}`.trim()}
      style={{ gap }}
    >
      {children}
    </div>
  );
}
