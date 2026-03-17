import React from "react";
import { Story } from "@ladle/react";

export interface StoryProps {
  [key: string]: any;
}

export const StoryContainer: React.FC<{
  children: React.ReactNode;
  maxWidth?: string;
}> = ({ children, maxWidth = "600px" }) => (
  <div
    style={{
      padding: "2rem",
      maxWidth,
      margin: "0 auto",
      background: "var(--bg-primary)",
    }}
  >
    {children}
  </div>
);

export const createStory = <P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  defaultProps: Partial<P> = {}
): Story<P> => {
  const StoryComponent = (props: P) => (
    <StoryContainer>
      <Component {...defaultProps} {...props} />
    </StoryContainer>
  );

  return StoryComponent as any;
};
