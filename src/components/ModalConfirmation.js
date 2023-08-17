import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";

export default function ModalConfirmation({
  isModalVisible,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Deseja realmente excluir?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={onClose}
            >
              <Text style={styles.modalButtonCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonConfirm}
              onPress={onConfirm}
            >
              <Text style={styles.modalButtonConfirmText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 300,
    height: 160,
    padding: 35,
  },
  modalText: {
    fontSize: 17,
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "80%",
    alignItems: "flex-end",
    paddingBottom: 10,
  },

  modalButtonCancel: {
    backgroundColor: Colors.bluishGray,
    borderRadius: 30,
    justifyContent: "center",
    height: 45,
    width: 110,
    elevation: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1.5,
  },
  modalButtonCancelText: {
    color: Colors.deepPurple,
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    borderLeftColor: Colors.white,
    textAlign: "center",
  },
  modalButtonConfirm: {
    backgroundColor: "#ff3f56",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1.5,
  },
  modalButtonConfirmText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    width: "55%",
    textAlign: "center",
  },
});
