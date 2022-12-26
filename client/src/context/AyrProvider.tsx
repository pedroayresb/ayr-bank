import React, { useState } from 'react';
import AyrContext from './AyrContext';
import PropTypes from 'prop-types';
import { UserInterface, AyrContextInterface } from '../interfaces/UserInterface';
import HistoryInterface from '../interfaces/HistoryInterface';
interface Props {
  children: React.ReactNode;
}

const apiUrl: string = process.env.REACT_APP_API_URL || 'localhost';

const AyrProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [url, setUrl] = useState(`${apiUrl}`);
  const [language, setLanguage] = useState('en');
  const [history, setHistory]= useState<HistoryInterface[] | null> ([]);

  const value = {
    user,
    setUser,
    url,
    setUrl,
    language,
    setLanguage,
    history,
    setHistory,
  } as AyrContextInterface;


  return (
    <AyrContext.Provider value={ value }>
      {children}
    </AyrContext.Provider>
  );
};

export default AyrProvider;

AyrProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
