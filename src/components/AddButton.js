import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../utils/Colors";

export default function AddButton({ onPressAdd }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPressAdd}>
        <Icon
          style={styles.iconButton}
          name="plus"
          size={22}
          color={Colors.lightGray}
        />
        <Text style={styles.textButton}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "8%",
  },
  button: {
    borderRadius: 30,
    backgroundColor: Colors.deepPurple,
    height: "80%",
    width: "40%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4%",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconButton: { width: "18%" },
  textButton: {
    width: "60%",
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    textAlign: "left",
  },
});
