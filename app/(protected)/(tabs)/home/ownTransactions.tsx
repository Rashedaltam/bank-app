import UserProfileBalanceData from "@/components/UserProfileBalanceData";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

/////// setting type for drop down value
type transactionType = `deposit` | `withdraw` | `transfer`;

///// drop sown list for "withdraw" and "deposit" options for each transaction

const ownTransactions = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<transactionType | null>(null);
  const [items, setItems] = useState([
    { label: "Deposit", value: "deposit" as transactionType },
    { label: "Withdraw", value: "withdraw" as transactionType },
    { label: "Transfer", value: "transfer" as transactionType },
  ]);

  //useMutation for new transaction (deposits & withdraw)

  //   const {mutate} = useMutation(
  //     {
  //         // mutationKey:["DepositToAccount","WithdrawFromoAccount"],
  //         // mutationFn: value === `deposit` ? DepositToAccount(amount) : WithdrawFromoAccount(amount)
  //     }
  //   )
  useEffect(() => {
    if (value === "transfer") {
      router.push("/(protected)/(tabs)/Benefeciary/benefieciary");
    }
  }, [value, router]);
  return (
    <View>
      <Text>ownTransactions</Text>

      {/* ////// to show the current balance */}
      <View>
        <UserProfileBalanceData />
      </View>

      <View style={{ padding: 20 }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select transaction type"
        />
        {/* //// to write a confirmation text for the user to confirm his selection from the drop down list and give comfort */}
        {value && (
          <Text style={{ marginTop: 10 }}>
            You selected: {value === "deposit" ? "Deposit" : "Withdraw"}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ownTransactions;

const styles = StyleSheet.create({});
