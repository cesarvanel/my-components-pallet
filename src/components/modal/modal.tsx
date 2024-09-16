import React from "react";
import styles from "./modal.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";
import { createPortal } from "react-dom";

interface ModalComponentProps {
  children: React.ReactNode;
  isOpen: boolean;

  closeModal?: () => void;
}

const className = classNameModule(styles);
const ModalComponent: React.FC<ModalComponentProps> = ({
  children,
  isOpen,
  closeModal,
}) => {
  return createPortal(
    <div {...className("ModalComponent", { open: isOpen })}>
      <div className={styles["container"]}>
        <header>
          <h2>My modal</h2>

          <button onClick={() => closeModal?.()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>

        <main>{children}</main>
      </div>
    </div>,
    document.body
  );
};

export default ModalComponent;
