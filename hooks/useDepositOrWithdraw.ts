//This tells React Query that when you call mutate(),
// the input must be an object matching this structure.
//Without it, we lose type checking.

import { DepositToAccount, WithdrawFromoAccount } from "@/api/services";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

//mutate({ amount: 100, value: 'WITHDRAW' });
type AccountMutationInput = {
  amount: number;
  value: "DEPOSIT" | "WITHDRAW";
};

export function useDepositOrWithdraw() {
  return useMutation<void, Error, AccountMutationInput>({
    mutationFn: ({ amount, value }) => {
      if (value.toUpperCase() === "DEPOSIT") {
        return DepositToAccount(amount);
      } else if (value.toUpperCase() === "WITHDRAW") {
        return WithdrawFromoAccount(amount);
      } else {
        // Reject with clear error
        return Promise.reject(
          new Error('Invalid value: must be "deposit" or "withdraw"')
        );
      }
    },
    //this is for testing may be removed later and replaced with an event loader
    onSuccess: (_data, variables) => {
      Alert.alert(
        "Success",
        `Transaction of ${variables.amount.toLocaleString()} KWD completed.`
      );
    },
  });
}
