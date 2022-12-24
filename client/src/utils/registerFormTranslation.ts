type RegisterFormTranslation = {
  [key: string]: {
    username: string;
    password: string;
    confirmPassword: string;
    submit: string;
  };
};


export const registerFormTranslation: RegisterFormTranslation = {
  'en': {
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    submit: 'Register',
  },
  'pt': {
    username: 'Nome de Usuário',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    submit: 'Registrar',
  },
};
