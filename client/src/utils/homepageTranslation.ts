type Translation =  {
  [key: string]: {
    login: string;
    register: string;
    welcome: string;
    balance: string;
  };
}

export const homepageTranslation: Translation = {
  'en': {
    login: 'Login',
    register: 'Register',
    welcome: 'Welcome',
    balance: 'Balance',
  },
  'pt': {
    login: 'Entrar',
    register: 'Registrar',
    welcome: 'Bem-vindo',
    balance: 'Saldo',
  },
};