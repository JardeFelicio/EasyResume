import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import Footer from "../../../../components/Footer";
import CustomInputPicker from "../../../../components/CustomInputPicker";
import Api from "../../../../controllers/LanguagesController";

export function LanguagesScreenAdd({ route }) {
  const selectedItem = route.params ? route.params.selectedItem : false;
  const [language, setLanguage] = useState(
    selectedItem ? selectedItem.languageName : ""
  );
  const [selectedFluency, setSelectedFluency] = useState(
    selectedItem ? selectedItem.fluencyLevel : ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const fluencyOptions = ["Básico", "Intermediário", "Avançado", "Fluente"];

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (language !== "" && selectedFluency !== "") {
      try {
        const createSucess = await Api.createLanguage(
          language,
          selectedFluency
        );

        if (createSucess) {
          navigation.replace("LanguagesScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error("Error saving language to AsyncStorage:", error);
      }
    } else {
      setErrorMessage("Preencha todos os campos");
    }
  };

  const handleSubmitCancel = () => {
    navigation.replace("LanguagesScreen");
  };

  const handleDelete = async () => {
    try {
      const deleteSucess = await Api.deleteLanguage(selectedItem.languageName);
      if (deleteSucess) {
        navigation.replace("LanguagesScreen");
      } else {
        console.log("Erro:", deleteSucess);
      }
    } catch (error) {
      console.error("Error deleting language:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={selectedItem ? "Editar Idioma" : "Adicionar Idioma"}
        screenReplace={"LanguagesScreen"}
      />
      <View style={styles.inputContainer}>
        <CustomInput
          value={language}
          onChangeText={setLanguage}
          placeholder={"Idioma"}
        />
        <CustomInputPicker
          selectedValue={selectedFluency}
          onValueChange={(itemValue) => setSelectedFluency(itemValue)}
          inputOptions={fluencyOptions}
          labelPlaceHolder={"Selecione o nivel"}
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
