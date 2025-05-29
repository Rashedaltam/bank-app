import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

/////// setting type for drop down value
type transactionType = `deposit` | `withdraw`


///// drop sown list for "withdraw" and "deposit" options for each transaction

const ownTransactions = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<transactionType | null>(null);
  const [items, setItems] = useState([
    { label: 'Deposit', value: 'deposit' as transactionType },
    { label: 'Withdraw', value: 'withdraw' as transactionType }
  ]);

  return (
    <View>
      <Text>ownTransactions</Text>

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
          You selected: {value === 'deposit' ? 'Deposit' : 'Withdraw'}
        </Text>
      )}

    </View>

    </View>
  )
}

export default ownTransactions

const styles = StyleSheet.create({})