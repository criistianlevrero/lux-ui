export interface OverlayProps {
  isVisible: boolean;
  onClick?: () => void;
  zIndex?: number;
  className?: string;
}

export function Overlay({ isVisible, onClick, zIndex = 40, className }: OverlayProps) {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${className || ''}`.trim()}
      style={{ zIndex }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
