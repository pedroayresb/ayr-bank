type Translation =  {
  [key: string]: {
    login: string;
    register: string;
  };
}

export const homepageTranslation: Translation = {
  'en': {
    login: 'Login',
    register: 'Register',
  },
  'pt': {
    login: 'Entrar',
    register: 'Registrar',
  },
};