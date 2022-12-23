export interface UserInterface { 
  id: number;
  name: string;
  password: string;
  accountId: number;
}

export interface AyrContextInterface {
  user: UserInterface | null;
  setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}