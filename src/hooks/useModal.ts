import { useState } from "react";

interface useModalBehavior {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export const useModal = (): useModalBehavior => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
  };
};
