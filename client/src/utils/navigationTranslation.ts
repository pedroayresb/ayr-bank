type Translation =  {
  [key: string]: {
    home: string;
    transfer: string;
    history: string;
    profile: string;
    logout: string;
  };
}

export const navigationTranslation: Translation = {
  'en': {
    home: 'Home',
    transfer: 'Transfer',
    history: 'History',
    profile: 'Profile',
    logout: 'Logout',
  },
  'pt': {
    home: 'Início',
    transfer: 'Transferir',
    history: 'Histórico',
    profile: 'Perfil',
    logout: 'Sair',
  },
};
