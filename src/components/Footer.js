import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../config/Colors";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function Footer({ onPressCancel, onPressSave }) {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color="#757575" />;
  } else {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onPressCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onPressSave}>
          <Icon
            style={styles.saveIcon}
            size={22}
            name="check"
            color={Colors.backgroundColor}
          />
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: "30%",
  },
  cancelButton: {
    backgroundColor: Colors.backgroundColor,
    borderRadius: 30,
    borderWidth: 0.4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: "28%",
    width: "40%",
    marginRight: 20,
  },
  cancelButtonText: {
    color: Colors.primaryColor,
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    borderLeftColor: Colors.backgroundColor,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: "28%",
    width: "40%",
  },
  saveIcon: { width: "20%" },
  saveButtonText: {
    color: Colors.backgroundColor,
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    borderLeftWidth: 0.5,
    borderLeftColor: Colors.backgroundColor,
    width: "55%",
    textAlign: "center",
  },
});
