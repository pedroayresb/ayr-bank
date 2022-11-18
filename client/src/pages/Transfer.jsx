import React from 'react';
import TransferForm from '../components/TransferForm';
import AccountButtonsContainer from '../components/AccountButtonsContainer';
import HeaderButtons from '../components/HeaderButtons';
import HideBalanceButton from '../components/HideBalanceButton';
import AccountBalance from '../components/AccountBalance';
import Footer from '../components/Footer';
import '../styles/AccountActionContainer.css';

function Transfer() {
  return (
    <div className="page">
      <HeaderButtons />
      <HideBalanceButton />
      <div className="home-container">
        <AccountButtonsContainer />
      </div>
      <div
        className="account-action-container"
      >
        <AccountBalance />
        <TransferForm />
      </div>
      <Footer />
    </div>
  );
}

export default Transfer;