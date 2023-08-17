import { Colors } from "../utils/Colors";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ActionSheetIOS,
} from "react-native";

export default function CustomInputPicker({
  selectedValue,
  onValueChange,
  inputOptions,
  labelPlaceHolder,
}) {
  const options = inputOptions.concat(["Cancelar"]);
  const cancelButtonIndex = inputOptions.length;
  const [isAndroid, setIsAndroid] = useState(Platform.OS === "android");

  const showActionSheetWithOptions = () => {
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

  const renderIOSPicker = () => (
    <TouchableOpacity
      style={styles.inputGroup}
      onPress={showActionSheetWithOptions}
    >
      <Text style={styles.input}>
        {selectedValue ? selectedValue : labelPlaceHolder}
      </Text>
    </TouchableOpacity>
  );

  const renderAndroidPicker = () => (
    <View style={styles.inputGroup}>
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
        {inputOptions.map((option) => (
          <Picker.Item
            style={styles.input}
            label={option}
            value={option}
            key={option}
          />
        ))}
      </Picker>
    </View>
  );

  return <View>{isAndroid ? renderAndroidPicker() : renderIOSPicker()}</View>;
}

const styles = StyleSheet.create({
  inputGroup: {
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    paddingHorizontal: Platform.OS === "android" ? 10 : 27,
    width: "100%",
    height: 65,
    borderColor: Colors.slateGray,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    alignItems: "center",
    width: "97%",
    fontSize: 18,
    color: Colors.slateGray,
  },

  itemPicker: { height: "100%", width: "97%" },
});
