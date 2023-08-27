import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";

export default function CustomTextArea({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        multiline
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        maxLength={250}
        numberOfLines={5}
        placeholderTextColor={Colors.lightBorderGray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    width: "100%",
    height: 210,
    borderColor: Colors.slateGray,
    borderRadius: 20,
  },
  input: {
    height: "100%",
    width: "100%",
    fontSize: 18,
    color: Colors.slateGray,
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 27,
    textAlignVertical: "top",
  },
});
