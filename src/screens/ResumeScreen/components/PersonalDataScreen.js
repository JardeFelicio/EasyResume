import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import DateInputIOS from "../../../components/DateInputIOS";
import Header from "../../../components/Header";
import { Colors } from "../../../utils/Colors";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export function PersonalDataScreen() {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(date);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Dados Pessoais"} screenReplace={"ResumeScreen"} />
      <TouchableOpacity onPress={showDatePicker}>
        <Text>{"Select Date"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        isDarkModeEnabled={true}
        textStyle={{ color: "blue" }} // Altera a cor do texto da data
        pickerStyle={{ backgroundColor: "white" }} // Altera a cor de fundo da modal
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  dateText: {
    fontSize: 18,
    color: "black", // Ajuste a cor conforme necessário
  },
});
