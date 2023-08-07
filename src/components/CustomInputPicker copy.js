import { View, StyleSheet } from "react-native";
import { Colors } from "../../config/Colors";
import { Picker } from "@react-native-picker/picker";

export default function CustomInputPicker({
  selectedValue,
  onValueChange,
  fluencyOptions,
  labelPlaceHolder,
}) {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.itemPicker}
      >
        <Picker.Item
          style={styles.inputPicker}
          label={labelPlaceHolder}
          value=""
        />
        {fluencyOptions.map((option) => (
          <Picker.Item
            style={styles.inputPicker}
            label={option}
            value={option}
            key={option}
          />
        ))}
      </Picker>
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
  itemPicker: { height: "100%", width: "97%" },
  inputPicker: {
    height: "100%",
    width: "97%",
    fontSize: 18,
    color: "#757575",
  },
});
