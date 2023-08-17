import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";

export default function CustomInput({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={false}
        placeholderTextColor={Colors.lightBorderGray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    paddingHorizontal: 27,
    width: "100%",
    height: 65,
    borderColor: Colors.slateGray,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: "100%",
    width: "97%",
    fontSize: 18,
    color: Colors.slateGray,
  },
});
