import * as React from 'react';
import PropTypes from 'prop-types';

interface AppProps {
  children?: React.ReactNode;
}

type UserModel = {
  id: number;
  user_name: string;
  password: string;
  account_id: number;
  createdAt: Date;
  updatedAt: Date;
};

interface AccountModel {
  id: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TransactionModel {
  id: number;
  value: number;
  creditedAccount: number;
  debitedAccount: number;
  createdAt: any;
  updatedAt: Date;
}

type NgContextProps = {
  user: UserModel;
  setUser: React.Dispatch<React.SetStateAction<UserModel>>;
  account: AccountModel;
  setAccount: React.Dispatch<React.SetStateAction<AccountModel>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  history: TransactionModel[];
  setHistory: React.Dispatch<React.SetStateAction<TransactionModel[]>>;
  showBalance: boolean;
  setShowBalance: React.Dispatch<React.SetStateAction<boolean>>;
  showHistory: boolean;
  setShowHistory: React.Dispatch<React.SetStateAction<boolean>>;  
}

type showHistory = boolean;
type language = string;

export const NgContext = React.createContext( {} as NgContextProps );

const NgProvider = ({ children }: AppProps) => {
  const [user, setUser] = React.useState<UserModel>({
    account_id: 0,
    createdAt: new Date(),
    id: 0,
    password: '',
    updatedAt: new Date(),
    user_name: '',
  });  
  const [account, setAccount] = React.useState<AccountModel>({
    balance: 0,
    createdAt: new Date(),
    id: 0,
    updatedAt: new Date(),
  });
  const [showHistory, setShowHistory] = React.useState<showHistory>(false);
  const [language, setLanguage] = React.useState<language>(navigator.language);
  const [showBalance, setShowBalance] = React.useState<showHistory>(false);
  const [history, setHistory] = React.useState<TransactionModel[]>([]);

  const context: NgContextProps = {
    user,
    setUser,
    account,
    setAccount,
    language,
    setLanguage,
    history,
    setHistory,
    showBalance,
    setShowBalance,
    showHistory,
    setShowHistory,
  };

  return <NgContext.Provider value={ context }>{children}</NgContext.Provider>;
}

NgProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NgProvider;