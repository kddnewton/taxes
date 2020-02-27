import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

type ModalProps = {
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
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
    <div ref={modalRef} className={styles.container}>
      {children}
    </div>,
    document.body
  );
};

export default Modal;
