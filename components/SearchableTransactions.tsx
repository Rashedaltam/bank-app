import { useFetchUserTransactionData } from "@/hooks/useFetchUserTransactionData";
import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateRangePicker from "./DateRangePicker";
import TransactionList from "./TransactionList";
import TransactionsTypeFilter from "./TransactionsTypeFilter";
import UserProfileBalanceV2 from "./UserProfileBalanceV2";

type Props = {
  fromDate: Date | null;
  toDate: Date | null;
  onChangeDate: (type: "from" | "to", date: Date) => void;
};

const SearchableTransactions: React.FC<Props> = ({
  fromDate,
  toDate,
  onChangeDate,
}) => {
  const { data: transactionList = [] } = useFetchUserTransactionData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransactionType, setSelectedTransactionType] = useState("All");

  const transactionTypes = useMemo(() => {
    const types = Array.from(
      new Set(
        transactionList.map((transaction) => transaction.type?.toLowerCase())
      )
    );
    return [
      "All",
      ...types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)),
    ];
  }, [transactionList]);

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    return transactionList.filter((transaction) => {
      if (!transaction.createdAt || !transaction.type) return false;

      const transactionDate = new Date(transaction.createdAt);
      if (isNaN(transactionDate.getTime())) return false;

      const matchesType =
        selectedTransactionType === "All" ||
        transaction.type.toLowerCase() ===
          selectedTransactionType.toLowerCase();

      const matchesSearch =
        transaction.type.toLowerCase().includes(normalizedQuery) ||
        (!isNaN(Number(searchQuery)) &&
          transaction.amount === parseFloat(searchQuery));

      const withinFromRange = fromDate
        ? transactionDate >= new Date(fromDate.setHours(0, 0, 0, 0))
        : true;
      const withinToRange = toDate
        ? transactionDate <= new Date(toDate.setHours(23, 59, 59, 999))
        : true;

      return matchesType && matchesSearch && withinFromRange && withinToRange;
    });
  }, [transactionList, searchQuery, selectedTransactionType, fromDate, toDate]);

  const { data, isLoading, isError, error, refetch } =
    useFetchUserProfileData();

  //refetch upon screen focus
  useFocusEffect(
    useCallback(() => {
      refetch(); // ensures fresh data on screen focus
    }, [])
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error?.message}</Text>;
  if (!data) return <Text>No data found</Text>;

  return (
    <View>
      <UserProfileBalanceV2 balance={data.balance} />
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by type or amount"
          value={searchQuery}
          onChangeText={setSearchQuery}
          selectionColor="#3a86ff"
          placeholderTextColor={"#cccccc"}
        />
        <TouchableOpacity>
          <MaterialIcons name="add" size={40} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <DateRangePicker
        fromDate={fromDate}
        toDate={toDate}
        onChangeFromDate={(date) => onChangeDate("from", date)}
        onChangeToDate={(date) => onChangeDate("to", date)}
      />

      <TransactionsTypeFilter
        types={transactionTypes}
        selectedType={selectedTransactionType}
        onSelectType={setSelectedTransactionType}
      />

      <TransactionList transactions={filteredTransactions} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: "#2a2a2a",
    color: "#fff",
    paddingVertical: 18, // ⬆️ taller
    paddingHorizontal: 18,
    borderRadius: 12,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#3a86ff",
    marginTop: 15,
    flexGrow: 1,
    marginRight: 10,

    letterSpacing: 1,
    fontWeight: "light",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default SearchableTransactions;
