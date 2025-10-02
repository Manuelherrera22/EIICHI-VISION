'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import InvestmentCalculatorModal from '@/components/modals/InvestmentCalculatorModal';

interface ModalContextType {
  openModal: (modalType: string, data?: any) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  currentModal: string | null;
  modalData: any;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  const openModal = (modalType: string, data?: any) => {
    setCurrentModal(modalType);
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal(null);
    setModalData(null);
  };

  const renderModal = () => {
    switch (currentModal) {
      case 'open-investment-calculator':
        return (
          <InvestmentCalculatorModal
            isOpen={isModalOpen}
            onClose={closeModal}
            initialData={modalData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen, currentModal, modalData }}>
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};




