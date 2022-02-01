import React, { useState } from 'react';
import Modal from 'react-modal';
import { TransactionProvider } from './hooks/useTransactions';
import { GlobalStyle } from './styles/global';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { NewTransactionModal } from './components/NewTransactionModal';

Modal.setAppElement('#root');

export const App: React.FC = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal(): void {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal(): void {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GlobalStyle />
    </TransactionProvider>
  );
};
