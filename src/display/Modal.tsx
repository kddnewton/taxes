import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

type ModalContextState = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ModalContext = React.createContext<ModalContextState>({
  open: false,
  onOpen: () => {},
  onClose: () => {}
});

const useModal = () => useContext(ModalContext);

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      onOpen: () => setOpen(true),
      onClose: () => setOpen(false)
    }),
    [open, setOpen]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

type ModalTriggerProps = {
  children: (onTrigger: () => void) => React.ReactNode;
}

const ModalTrigger = ({ children }: ModalTriggerProps) => {
  const { onOpen } = useModal();

  return <>{children(onOpen)}</>;
};

const ModalContent: React.FC = ({ children }) => {
  const { open } = useModal();

  if (!open) {
    return null;
  }

  return <ModalBody>{children}</ModalBody>;
};

const ModalBody: React.FC = ({ children }) => {
  const { onClose } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const modal = modalRef.current;

      const onClick = (event: MouseEvent) => {
        if (modal && event.target instanceof Element && !modal.contains(event.target)) {
          onClose();
        }
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("click", onClick);
      document.addEventListener("keydown", onKeyDown);

      return () => {
        document.removeEventListener("click", onClick);
        document.removeEventListener("keydown", onKeyDown);
      };
    },
    [open, modalRef, onClose]
  );

  return ReactDOM.createPortal(
    <div ref={modalRef} className={styles.container}>
      {children}
    </div>,
    document.body
  );
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;

export default Modal;
