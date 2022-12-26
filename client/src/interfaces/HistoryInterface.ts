export default interface HistoryInterface {
  id?: number;
  debitedAccount: number;
  creditedAccount: number;
  sender: string;
  receiver: string;
  value: number;
  createdAt: Date;
  updatedAt?: Date;
};