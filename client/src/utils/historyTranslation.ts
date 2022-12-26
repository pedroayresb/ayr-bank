type Translation =  {
  [key: string]: {
    history: string;
    sendHistory: string; 
    receiveHistory: string;
    startDate: string;
    endDate: string;
    filter: string;
    All: string;
    Send: string;
    Receive: string;
    Value: string;
    Date: string;
    NoHistory: string;
  };
}

export const historyTranslation: Translation = {
  'en': {
    history: 'History',
    sendHistory: 'Send History',
    receiveHistory: 'Receive History',
    startDate: 'Start Date',
    endDate: 'End Date',
    filter: 'Filter',
    All: 'All',
    Send: 'Sent by',
    Receive: 'Received by',
    Value: 'Value',
    Date: 'Date',
    NoHistory: 'No history to show',
  },
  'pt': {
    history: 'Histórico',
    sendHistory: 'Histórico de envios',
    receiveHistory: 'Histórico de recebimentos',
    startDate: 'Data inicial',
    endDate: 'Data final',
    filter: 'Filtrar',
    All: 'Todos',
    Send: 'Enviado por',
    Receive: 'Recebido por',
    Value: 'Valor',
    Date: 'Data',
    NoHistory: 'Nenhum histórico para mostrar',
  },
};
