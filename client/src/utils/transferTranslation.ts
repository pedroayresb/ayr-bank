type Translation = {
  [key: string]: {
    transfer: string;
    amount: string;
    to: string;
    submit: string;
    cancel: string;
    completed: string;
  };
};

export const transferTranslation: Translation = {
  'en': {
    transfer: 'Transfer',
    amount: 'Amount',
    to: 'To',
    submit: 'Submit',
    cancel: 'Cancel',
    completed: 'Transfer completed',
  },
  'pt': {
    transfer: 'Transferir',
    amount: 'Quantidade',
    to: 'Para',
    submit: 'Enviar',
    cancel: 'Cancelar',
    completed: 'Transferência concluída',
  },
};