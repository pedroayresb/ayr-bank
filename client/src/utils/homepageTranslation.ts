type Translation =  {
  [key: string]: {
    login: string;
    register: string;
    welcome: string;
    balance: string;
    lastSent: string;
    lastReceived: string;
  };
}

export const homepageTranslation: Translation = {
  'en': {
    login: 'Login',
    register: 'Register',
    welcome: 'Welcome',
    balance: 'Balance',
    lastSent: 'Last Transfer Sent',
    lastReceived: 'Last Transfer Received',
  },
  'pt': {
    login: 'Entrar',
    register: 'Registrar',
    welcome: 'Bem-vindo',
    balance: 'Saldo',
    lastSent: 'Última Transferência Enviada',
    lastReceived: 'Última Transferência Recebida',
  },
};