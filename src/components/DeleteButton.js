import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../utils/Colors";

export default function DeleteButton({ onPressDelete }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressDelete}>
        {/* <Icon
          style={styles.iconButton}
          name="delete"
          size={22}
          color={Colors.primaryColor}
        /> */}
        <Text style={styles.textButton}>Apagar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    backgroundColor: Colors.backgroundColor,
    width: "70%",
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 0.4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    borderRadius: 30,
    backgroundColor: Colors.white,
    width: "80%",
    height: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: { width: "18%" },
  textButton: {
    color: Colors.deepPurple,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
});
