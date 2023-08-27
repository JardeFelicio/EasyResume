import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import CustomTextArea from "../../../../components/CustomTextArea";

import Footer from "../../../../components/Footer";
import Api from "../../../../controllers/ProfessionalQualificationsController";

export function ProfessionalQualificationsScreenAdd({ route }) {
  const navigation = useNavigation();

  const selectedItem = route.params ? route.params.selectedItem : false;

  const [qualificationTitle, setQualificationTitle] = useState(
    selectedItem ? selectedItem.title : ""
  );
  const [qualificationDescription, setQualificationDescription] = useState(
    selectedItem ? selectedItem.description : ""
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (qualificationTitle !== "" && qualificationDescription !== "") {
      try {
        const createSucess = await Api.createQualification({
          title: qualificationTitle,
          description: qualificationDescription,
        });

        if (createSucess) {
          navigation.goBack("ProfessionalQualificationsScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error("Error saving qualification to AsyncStorage:", error);
      }
    } else {
      setErrorMessage("Preencha todos os campos");
    }
  };

  const handleSubmitCancel = () => {
    navigation.goBack("ProfessionalQualificationsScreen");
  };

  const handleDelete = async () => {
    try {
      const deleteSucess = await Api.deleteQualification(selectedItem.title);
      if (deleteSucess) {
        navigation.goBack("ProfessionalQualificationsScreen");
      } else {
        console.log("Erro:", deleteSucess);
      }
    } catch (error) {
      console.error("Error deleting qualification:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={selectedItem ? "Editar Qualificação" : "Adicionar Qualificação"}
        screenReplace={"ProfessionalQualificationsScreen"}
        goBackScreen={true}
      />
      <View style={styles.inputContainer}>
        <CustomInput
          value={qualificationTitle}
          onChangeText={setQualificationTitle}
          placeholder={"Titulo da atividade"}
        />
        <CustomTextArea
          value={qualificationDescription}
          onChangeText={setQualificationDescription}
          placeholder={"Descrição da atividade"}
        />
      </View>
      <View style={styles.footer}>
        <Footer
          onPressSave={handleSubmit}
          onPressCancel={selectedItem ? handleDelete : handleSubmitCancel}
          isDelete={selectedItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  inputContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
    width: "100%",
    justifyContent: "center",
    gap: 16,
  },
  footer: {
    marginTop: 20,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
});
