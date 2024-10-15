import { useEffect, useRef, useState } from "react";
import styles from "./disclosure.module.scss";
import { classNameModule } from "../../utils/class-name-module/classNameModule";

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  autoClose?: boolean;
  defaultOpen?:boolean;
  onToggle?: (isOpen: boolean) => void;
}

const className = classNameModule(styles);
const Disclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  autoClose = false,
  defaultOpen,
  onToggle,
}) => {


  const [isOpen, setIsOpen] = useState(defaultOpen??false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDisclosure = () => {
    setIsOpen((prevState) => !prevState);
    if (onToggle) onToggle(!isOpen);
  };

  useEffect(() => {
   if (autoClose && isOpen && !defaultOpen) {
     setIsOpen(false);
   }
 }, [autoClose, isOpen, defaultOpen]);


  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  return (
    <div {...className("Disclosure", { open: isOpen, closed: !isOpen })}>
      <button
        onClick={toggleDisclosure}
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
      >
        {title}
      </button>

      <div
        id="disclosure-content"
        ref={contentRef}
        className={styles["content"]}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
};

export default Disclosure;
