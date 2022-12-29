type Translation = {
  [key: string]: {
    transfer: string;
    amount: string;
    to: string;
    submit: string;
    cancel: string;
    completed: string;
    from: string;
    date: string;
    noSent: string;
    noReceived: string;
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
    from: 'From',
    date: 'Date',
    noSent: 'No sent transfers',
    noReceived: 'No received transfers',
  },
  'pt': {
    transfer: 'Transferir',
    amount: 'Quantidade',
    to: 'Para',
    submit: 'Enviar',
    cancel: 'Cancelar',
    completed: 'Transferência concluída',
    from: 'De',
    date: 'Data',
    noSent: 'Nenhuma transferência enviada',
    noReceived: 'Nenhuma transferência recebida',
  },
};