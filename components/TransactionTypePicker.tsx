// dropdown picker to selecting transaction type
// this component is designed to do 2 instructions:
// 1- redirect to beneficiary page if "Transfer" type is selected
// determine one of the props TransactionType "value" needed for useDepositOrWithddraw
// which will control which function withdraw or deposit to be called to backend
import { TransactionType } from "@/types/TransactionType";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const screenWidth = Dimensions.get("window").width;

//originally built dropdow picker didn't include this interface.
// however it needed now to enable refacturing
// props declared explicitly here,
// since we’re passing those same state values from the parent into a child.
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>; //dispatch is a native type refering to void function
  value: TransactionType | null;
  setValue: Dispatch<SetStateAction<TransactionType | null>>; //setStateAction is native type refering to useState logic
  items: { label: string; value: TransactionType }[];
  setItems: Dispatch<
    SetStateAction<{ label: string; value: TransactionType }[]>
  >;
};

const TransactionTypePicker = ({
  open,
  setOpen,
  value,
  setValue,
  items,
  setItems,
}: Props) => (
  <DropDownPicker
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    setItems={setItems}
    placeholder="Select transaction type"
    style={styles.dropdown}
    dropDownContainerStyle={styles.dropDownContainer}
    textStyle={styles.textStyle}
    labelStyle={styles.labelStyle}
    listItemLabelStyle={styles.listItemLabelStyle}
    selectedItemLabelStyle={styles.selectedItemLabelStyle}
    placeholderStyle={styles.placeholderStyle}
    arrowIconStyle={styles.arrowIconStyle}
    listMode="SCROLLVIEW"
  />
);

export default TransactionTypePicker;

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#2c2c2c",
    borderColor: "#444",
    width: screenWidth * 0.9,
    alignSelf: "center",
    minHeight: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropDownContainer: {
    backgroundColor: "#1e1e1e",
    borderColor: "#444",
    width: screenWidth * 0.9,
    alignSelf: "center",
  },
  textStyle: {
    fontSize: 30,
    color: "#ffffff",
  },
  labelStyle: {
    fontSize: 30,
    color: "#ffffff",
  },
  listItemLabelStyle: {
    fontSize: 30,
    color: "#ffffff",
    padding: 10,
  },
  selectedItemLabelStyle: {
    fontWeight: "bold",
    color: "#3a86ff",
    padding: 10,
  },
  placeholderStyle: {
    color: "#aaa",
    fontSize: 30,
    padding: 10,
  },
  arrowIconStyle: {
    tintColor: "white",
  },
});
