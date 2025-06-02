import { TransferToBeneficiary } from "@/api/services";
import { BeneficiaryTransferDataType } from "@/types/BeneficiaryTransferDataType";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export function useBeneficiaryTransfer() {
  return useMutation<void, Error, BeneficiaryTransferDataType>({
    mutationFn: ({ amount, username }) =>
      TransferToBeneficiary(amount, username),
    onSuccess: (_data, variables) => {
      Alert.alert(
        "Transfer Successful",
        `Transferred $${variables.amount.toLocaleString()} to ${
          variables.username
        }`
      );
    },
    onError: (error) => {
      Alert.alert("Transfer Failed", error.message);
    },
  });
}
