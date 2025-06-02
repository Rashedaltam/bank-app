import { GetTransactions } from "@/api/services"; // adjust path as needed
import { TransactionDataType } from "@/types/TransactionDataType";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserTransactionData() {
  return useQuery<TransactionDataType[]>({
    queryKey: ["GetTransactions"],
    queryFn: GetTransactions,
  });
}
