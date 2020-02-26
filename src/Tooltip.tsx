import React, { useContext, useMemo, useState } from "react";
import ReactDOM from "react-dom";

type TooltipContextState = {
  onEnter: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onLeave: () => void;
  position: null | DOMRect;
};

const TooltipContext = React.createContext<TooltipContextState>({
  onEnter: () => {},
  onLeave: () => {},
  position: null
});

const useTooltip = () => useContext(TooltipContext);

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState<TooltipContextState["position"]>(null);

  const value = useMemo(
    () => ({
      onEnter: (event: React.MouseEvent<HTMLSpanElement>) => {
        if (event.target instanceof HTMLSpanElement) {
          setPosition(event.target.getBoundingClientRect());
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

const TooltipTrigger: React.FC = ({ children }) => {
  const { onEnter, onLeave } = useTooltip();

  return (
    <span onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </span>
  );
};

const TooltipContent: React.FC = ({ children }) => {
  const { position } = useTooltip();

  if (position === null) {
    return null;
  }

  const { left, top } = position;
  const style = { left: left - 20, top: top + window.scrollY + 30 };

  return ReactDOM.createPortal(
    <div className="tooltip" style={style}>{children}</div>,
    document.body
  );
};

Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export default Tooltip;
