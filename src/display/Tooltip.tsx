import React, { useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./tooltip.module.css";

type TooltipContextState = {
  onEnter: (event: React.MouseEvent<HTMLElement>) => void;
  onLeave: () => void;
  position: null | { left: number; top: number };
};

const TooltipContext = React.createContext<TooltipContextState>({
  onEnter: () => {
    throw new Error("Tooltip child component rendered outside TooltipContext");
  },
  onLeave: () => {
    throw new Error("Tooltip child component rendered outside TooltipContext");
  },
  position: null
});

const useTooltip = () => useContext(TooltipContext);

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState<TooltipContextState["position"]>(null);

  const value = useMemo(
    () => ({
      onEnter: (event: React.MouseEvent<HTMLElement>) => {
        if (event.target instanceof HTMLElement) {
          const { top } = event.target.getBoundingClientRect();
          setPosition({ left: event.clientX - 20, top: top + window.scrollY + 30 });
        }
      },
      onLeave: () => {
        setPosition(null);
      },
      position
    }),
    [position, setPosition]
  );

  return (
    <TooltipContext.Provider value={value}>
      {children}
    </TooltipContext.Provider>
  );
};

type TooltipTriggerProps<P extends any = any> = (
  | ({ as: React.ComponentType<P> } & P)
  | { as: undefined }
);

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ as: As = "span", children }) => {
  const { onEnter, onLeave } = useTooltip();

  return (
    <As onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </As>
  );
};

const TooltipContent: React.FC = ({ children }) => {
  const { position } = useTooltip();

  if (position === null) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.tooltip} style={position}>{children}</div>,
    document.body
  );
};

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export default Tooltip;
