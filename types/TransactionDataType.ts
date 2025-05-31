//captured from console log
export interface TransactionDataType {
  _id: string;
  amount: number;
  type: "deposit" | "withdraw";
  from: string;
  to: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
