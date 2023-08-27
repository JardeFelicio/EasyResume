import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../utils/Colors";
import Checkbox from "expo-checkbox";

export default function CustomCheckBox({ value, onChecked, placeholder }) {
  return (
    <View style={styles.checkboxGroup}>
      <Checkbox
        style={styles.checkbox}
        value={value}
        onValueChange={onChecked}
        color={value ? Colors.deepPurple : undefined}
      />
      <Text style={styles.text}>{placeholder}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxGroup: {
    flexDirection: "row",
    paddingHorizontal: 2,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkbox: { margin: 8, height: 25, width: 25, borderRadius: 10 },
  text: {
    fontSize: 18,
    color: Colors.slateGray,
  },
});
