
import React from "react";
import "./theme.css";

const GlobalDecorator: React.FC<{
  children: React.ReactNode;
  theme?: "dark" | "light";
}> = ({ children, theme = "dark" }) => {
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("lux-ui-theme", theme);
  }, [theme]);

  return (
    <div className="ladle-root">
      {children}
    </div>
  );
};

export const globalTypes = {
  theme: {
    name: "Theme",
    options: {
      dark: "Dark",
      light: "Light",
    },
    defaultValue: "dark",
    description: "Select the application theme",
  },
};

export const decoratorConfig = [
  {
    decorator: GlobalDecorator,
    matchStories: ".*",
  },
];
