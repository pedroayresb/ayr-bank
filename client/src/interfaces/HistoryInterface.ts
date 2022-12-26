export default interface HistoryInterface {
  id?: number;
  debitedAccount: number;
  creditedAccount: number;
  value: number;
  createdAt: Date;
  updatedAt?: Date;
};