import React, { MouseEventHandler, useContext, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

type ModalContextState = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ModalContext = React.createContext<ModalContextState>({
  open: false,
  onOpen: () => {
    // do nothing
  },
  onClose: () => {
    // do nothing
  }
});

const useModal = () => useContext(ModalContext);

const Modal = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      onOpen: () => setOpen(true),
      onClose: () => setOpen(false)
    }),
    [open, setOpen]
  );

  useEffect(
    () => {
      document.body.style.overflow = open ? "hidden" : "initial";
    },
    [open]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

type ModalTriggerProps = {
  className?: string;
  disabled?: boolean;
};

const ModalTrigger: React.FC<ModalTriggerProps> = ({ children, className, disabled }) => {
  const { onOpen } = useModal();
  const classNames = [styles.trigger, className].join(" ");

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    onOpen();
  };

  return (
    <button type="button" className={classNames} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
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
    [modalRef, onClose]
  );

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.container}>
        {children}
      </div>
    </div>,
    document.body
  );
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;

export default Modal;
