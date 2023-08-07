import { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
} from "react-native";
import { Colors } from "../../config/Colors";

export default function CustomInputPicker({
  selectedValue,
  onValueChange,
  fluencyOptions,
  labelPlaceHolder,
}) {
  const [showActionSheet, setShowActionSheet] = useState(false);

  const actionSheetRef = useRef();

  const showActionSheetWithOptions = () => {
    const options = fluencyOptions.concat(["Cancelar"]);
    const cancelButtonIndex = fluencyOptions.length;

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: cancelButtonIndex,
        title: labelPlaceHolder,
      },
      (buttonIndex) => {
        if (buttonIndex !== cancelButtonIndex) {
          onValueChange(options[buttonIndex]);
        }
      }
    );
  };

  const handlePickerPress = () => {
    if (Platform.OS === "ios") {
      showActionSheetWithOptions();
    } else {
      // Fallback for Android or other platforms, use the Picker as before
      setShowActionSheet(true);
    }
  };

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity style={styles.itemPicker} onPress={handlePickerPress}>
        <Text style={styles.inputPicker}>
          {selectedValue ? selectedValue : labelPlaceHolder}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: Colors.secondaryColor,
    paddingHorizontal: 10,
    width: "100%",
    height: 70,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  itemPicker: {
    height: "100%",
    width: "97%",
  },
  inputPicker: {
    height: "100%",
    width: "97%",
    fontSize: 18,
    color: "#757575",
    alignItems: "center",
    justifyContent: "center",
  },
});
