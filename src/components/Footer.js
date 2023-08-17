import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../utils/Colors";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useState } from "react";
import ModalConfirmation from "./ModalConfirmation";

export default function Footer({ onPressCancel, onPressSave, isDelete }) {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  const textButtonCancel = isDelete ? "Apagar" : "Cancelar";
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalConfirm = () => {
    onPressCancel();
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={Colors.slateGray} />;
  } else {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={isDelete ? showModal : onPressCancel}
        >
          <Text style={styles.cancelButtonText}>{textButtonCancel}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onPressSave}>
          <Icon
            style={styles.saveIcon}
            size={22}
            name="check"
            color={Colors.white}
          />
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
        {isModalVisible && (
          <ModalConfirmation
            isModalVisible={isModalVisible}
            onClose={handleModalClose}
            onConfirm={handleModalConfirm}
          />
        )}
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
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    borderWidth: 0.4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 65,
    width: "40%",
    marginRight: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cancelButtonText: {
    color: Colors.deepPurple,
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    borderLeftColor: Colors.white,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: Colors.deepPurple,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 65,
    width: "40%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveIcon: { width: "20%" },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    borderLeftColor: Colors.white,
    width: "55%",
    textAlign: "center",
  },
});
