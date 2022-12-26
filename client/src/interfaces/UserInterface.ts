import HistoryInterface from './HistoryInterface';

interface AccountInterface {
  id: number;
  balance: number;
}
export interface UserInterface { 
  id: number;
  name: string;
  password: string;
  accountId: number;
  Account: AccountInterface;
}

export interface AyrContextInterface {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  history: HistoryInterface[] | null;
  setHistory: React.Dispatch<React.SetStateAction<HistoryInterface[]| null>>;
}