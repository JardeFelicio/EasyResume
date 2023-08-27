import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/Colors";
import Header from "../../../components/Header";
import CustomTextArea from "../../../components/CustomTextArea";
import CustomInput from "../../../components/CustomInput";
import Footer from "../../../components/Footer";
import Api from "../../../controllers/ProfessionalObjectiveController";

export function ProfessionalObjectiveScreen() {
  const navigation = useNavigation();

  const [objective, setObjective] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (objective !== "") {
      try {
        const createSucess = await Api.createObjective(objective);

        if (createSucess) {
          navigation.replace("ResumeScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error("Error saving objective to AsyncStorage:", error);
      }
    } else {
      setErrorMessage("Preencha o campo");
    }
  };

  const handleSubmitCancel = () => {
    navigation.replace("ResumeScreen");
  };

  async function loadOjectiveFromStorage() {
    try {
      const data = await Api.getObjective();
      if (data != null) {
        setObjective(data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadOjectiveFromStorage();
  }, []);

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Header title={"Editar Objetivo"} screenReplace={"ResumeScreen"} />
        <View style={styles.inputContainer}>
          <CustomInput
            value={objective}
            onChangeText={setObjective}
            placeholder={"Área que deseja atuar"}
          />
        </View>
        <View style={styles.footer}>
          <Footer
            onPressSave={handleSubmit}
            onPressCancel={handleSubmitCancel}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafeArea: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
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
