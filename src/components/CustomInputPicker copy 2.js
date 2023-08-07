import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../config/Colors";
import ModalPicker from "react-native-modal-picker";

export default function CustomInputPicker({
  selectedValue,
  onValueChange,
  fluencyOptions,
  labelPlaceHolder,
}) {
  const data = fluencyOptions.map((option, index) => ({
    key: index,
    label: option,
    value: option,
  }));

  return (
    <View style={styles.pickerContainer}>
      <ModalPicker
        data={data}
        initValue={labelPlaceHolder}
        onChange={(option) => onValueChange(option.value)}
      >
        <TouchableOpacity style={styles.itemPicker}>
          <Text style={styles.inputPicker}>
            {selectedValue ? selectedValue : labelPlaceHolder}
          </Text>
        </TouchableOpacity>
      </ModalPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: Colors.secondaryColor,
    flexDirection: "row",
    paddingHorizontal: 10,
    width: "100%",
    height: 70,
    borderColor: "#757575",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemPicker: { height: "100%", width: "97%", justifyContent: "center" },
  inputPicker: {
    fontSize: 18,
    color: "#757575",
  },
});
