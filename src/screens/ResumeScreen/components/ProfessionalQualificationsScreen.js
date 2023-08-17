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
import Footer from "../../../components/Footer";
import Api from "../../../controllers/ProfessionalObjectiveController";

export function ProfessionalQualificationsScreen() {
  const navigation = useNavigation();

  const [objective, setObjective] = useState(
    "Busco oportunidade de desenvolver e aplicar minhas habilidades e conhecimentos em [área de atuação desejada]."
  );

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
    const data = await Api.getObjective();
    return data;
  }
  useEffect(() => {
    loadOjectiveFromStorage()
      .then((data) => {
        if (data != "") {
          setObjective(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Header title={"Editar Objetivo"} screenReplace={"ResumeScreen"} />
        <View style={styles.inputContainer}>
          <CustomTextArea
            value={objective}
            onChangeText={setObjective}
            numberOfLines={5}
            placeholder={"Objetivo profissional (área que deseja atuar)"}
          />
        </View>
        <Footer onPressSave={handleSubmit} onPressCancel={handleSubmitCancel} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafeArea: {
    flex: 1,
    backgroundColor: Colors.white,
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
});
