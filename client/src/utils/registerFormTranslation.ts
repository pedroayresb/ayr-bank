type RegisterFormTranslation = {
  [key: string]: {
    username: string;
    password: string;
    confirmPassword: string;
    submit: string;
    login: string;
  };
};


export const registerFormTranslation: RegisterFormTranslation = {
  'en': {
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    submit: 'Register',
    login: 'Login',
  },
  'pt': {
    username: 'Nome de Usuário',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    submit: 'Registrar',
    login: 'Entrar',
  },
};
