import React from "react";
import { Button, StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  fromDate: Date | null;
  toDate: Date | null;
  onChangeFromDate: (date: Date) => void;
  onChangeToDate: (date: Date) => void;
};

const DateRangePicker: React.FC<Props> = ({
  fromDate,
  toDate,
  onChangeFromDate,
  onChangeToDate,
}) => {
  const [showFromPicker, setShowFromPicker] = React.useState(false);
  const [showToPicker, setShowToPicker] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.buttonRow}>
        <Button
          title={
            fromDate ? `From: ${fromDate.toDateString()}` : "Select From Date"
          }
          onPress={() => setShowFromPicker(true)}
        />
        <Button
          title={toDate ? `To: ${toDate.toDateString()}` : "Select To Date"}
          onPress={() => setShowToPicker(true)}
        />
      </View>

      <DateTimePickerModal
        isVisible={showFromPicker}
        mode="date"
        onConfirm={(date) => {
          setShowFromPicker(false);
          onChangeFromDate(date);
        }}
        onCancel={() => setShowFromPicker(false)}
      />

      <DateTimePickerModal
        isVisible={showToPicker}
        mode="date"
        onConfirm={(date) => {
          setShowToPicker(false);
          onChangeToDate(date);
        }}
        onCancel={() => setShowToPicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default DateRangePicker;
