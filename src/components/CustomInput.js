import { View, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../config/Colors";

export default function CustomInput({ value, onChangeText, placeholder }) {
  return (
    <View style={styles.inputGroup}>
      <TextInput
        style={styles.input}
        color="#757575"
        placeholderTextColor="#757575"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    backgroundColor: Colors.secondaryColor,
    flexDirection: "row",
    paddingHorizontal: 27,
    width: "100%",
    height: 70,
    borderColor: "#757575",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: "100%",
    width: "97%",
    fontSize: 18,
    color: "#757575",
  },
});
