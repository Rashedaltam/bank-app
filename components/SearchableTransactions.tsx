import { useFetchUserTransactionData } from "@/hooks/useFetchUserTransactionData";
import { TransactionDataType } from "@/types/TransactionDataType";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TransactionList from "./TransactionList";
import TransactionsSearchBar from "./TransactionsSearchBar";
import TransactionsTypeFilter from "./TransactionsTypeFilter";

type SearchableTransactionsProps = {
  fromDate: Date | null;
  toDate: Date | null;
  onChangeDate: (type: "from" | "to", date: Date) => void;
};

const SearchableTransactions: React.FC<SearchableTransactionsProps> = ({
  fromDate,
  toDate,
  onChangeDate,
}) => {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"deposit" | "withdraw">(
    "deposit"
  );
  const [datePickerVisible, setDatePickerVisible] = useState<{
    mode: "from" | "to" | null;
    visible: boolean;
  }>({ mode: null, visible: false });

  const {
    data: transactions,
    isLoading,
    error,
  } = useFetchUserTransactionData();

  const filteredTransactions: TransactionDataType[] = useMemo(() => {
    if (!transactions) return [];

    const lower = query.toLowerCase().trim();

    return transactions.filter((tx) => {
      const matchesType = tx.type === selectedType;

      const matchesSearch =
        tx.type.includes(lower) || tx.amount.toString().includes(query);

      const txDate = new Date(tx.createdAt);
      const matchFrom = fromDate ? txDate >= fromDate : true;
      const matchTo = toDate ? txDate <= toDate : true;

      return matchesType && matchesSearch && matchFrom && matchTo;
    });
  }, [transactions, query, selectedType, fromDate, toDate]);

  const handleConfirm = (date: Date) => {
    if (datePickerVisible.mode === "from") onChangeDate("from", date);
    if (datePickerVisible.mode === "to") onChangeDate("to", date);
    setDatePickerVisible({ mode: null, visible: false });
  };

  const handleCancel = () => {
    setDatePickerVisible({ mode: null, visible: false });
  };

  const clearFromDate = () => onChangeDate("from", null as any);
  const clearToDate = () => onChangeDate("to", null as any);

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TransactionsSearchBar value={query} onChange={setQuery} />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => console.log("Add")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TransactionsTypeFilter
        type={["deposit", "withdraw"]}
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      <View style={styles.dateRow}>
        <View style={styles.dateGroup}>
          <TouchableOpacity
            onPress={() =>
              setDatePickerVisible({ mode: "from", visible: true })
            }
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              From: {fromDate ? fromDate.toDateString() : "Any"}
            </Text>
          </TouchableOpacity>
          {fromDate && (
            <TouchableOpacity onPress={clearFromDate} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.dateGroup}>
          <TouchableOpacity
            onPress={() => setDatePickerVisible({ mode: "to", visible: true })}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>
              To: {toDate ? toDate.toDateString() : "Any"}
            </Text>
          </TouchableOpacity>
          {toDate && (
            <TouchableOpacity onPress={clearToDate} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#3a86ff" />
      ) : error ? (
        <Text style={{ color: "#f44336", textAlign: "center" }}>
          Error loading transactions
        </Text>
      ) : (
        <TransactionList transactions={filteredTransactions} />
      )}

      <DateTimePickerModal
        isVisible={datePickerVisible.visible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  addButton: {
    marginLeft: 12,
    backgroundColor: "#3a86ff",
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: -2,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateGroup: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  dateButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  clearBtn: {
    marginTop: 4,
  },
  clearBtnText: {
    color: "#f55",
    fontSize: 12,
  },
});

export default SearchableTransactions;
