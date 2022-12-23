import React, { useState } from 'react';
import AyrContext from './AyrContext';
import PropTypes from 'prop-types';
import { UserInterface } from '../interfaces/UserInterface';


interface Props {
  children: React.ReactNode;
}


const apiUrl: string = process.env.REACT_APP_API_URL || 'localhost';
const apiPort: string = process.env.REACT_APP_API_PORT || '5000';


const AyrProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState('');
  const [url, setUrl] = useState(`${apiUrl}:${apiPort}`);
  const [language, setLanguage] = useState('en');

  const value = {
    user,
    setUser,
    token,
    setToken,
    url,
    setUrl,
    language,
    setLanguage,
  };


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
