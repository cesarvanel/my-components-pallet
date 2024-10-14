import { useState } from "react";

interface useModalBehavior {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export const useModal = ({
  modalId,
}: {
  modalId?: string;
}): useModalBehavior => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // useEffect(() => {

  //   if(!modalId) return
  //   const handleOpenModalByEvent = (id: string) => {
  //     if (id === modalId) {
  //       handleOpenModal();
  //     }

  //     handleOpenModal();
  //   };

  //   eventsEmitter.on("APP-MODAL", (args) => {
  //     const id = args.key as string;
  //     handleOpenModalByEvent(id);
  //   });
  //   return () => {
  //     eventsEmitter.off("APP-MODAL", handleOpenModalByEvent);
  //   };
  // }, [modalId]);

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
