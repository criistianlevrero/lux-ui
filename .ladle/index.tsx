import { AppProvider } from "@ladle/react";

export const Provider: AppProvider = ({
  children,
}) => {
  return (
    <div>
      {children}
    </div>
  );
};
