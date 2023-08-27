import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import CustomTextArea from "../../../../components/CustomTextArea";

import Footer from "../../../../components/Footer";
import Api from "../../../../controllers/AdditionalInformationController";

export function AdditionalInformationScreenAdd({ route }) {
  const navigation = useNavigation();

  const selectedItem = route.params ? route.params.selectedItem : false;

  const [information, setInformation] = useState(
    selectedItem ? selectedItem.information : ""
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (information !== "") {
      try {
        const createSucess = await Api.createAdditional(information);

        if (createSucess) {
          navigation.goBack("AdditionalInformationScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error(
          "Error saving additional information to AsyncStorage:",
          error
        );
      }
    } else {
      setErrorMessage("Preencha todos os campos");
    }
  };

  const handleSubmitCancel = () => {
    navigation.goBack("AdditionalInformationScreen");
  };

  const handleDelete = async () => {
    try {
      const deleteSucess = await Api.deleteAdditional(selectedItem.information);
      if (deleteSucess) {
        navigation.goBack("AdditionalInformationScreen");
      } else {
        console.log("Erro:", deleteSucess);
      }
    } catch (error) {
      console.error("Error deleting additional information:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Informação Adicional"}
        screenReplace={"AdditionalInformationScreen"}
        goBackScreen={true}
      />
      <View style={styles.inputContainer}>
        <CustomTextArea
          value={information}
          onChangeText={setInformation}
          placeholder={"Ex: Disponibilidade para inicio imediato"}
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
