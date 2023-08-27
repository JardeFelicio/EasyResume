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
import Api from "../../../controllers/QualificationsSummaryController";

export function QualificationsSummaryScreen() {
  const navigation = useNavigation();

  const [qualificationsSummary, setQualificationsSummary] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (qualificationsSummary !== "" && qualificationsSummary) {
      console.log(qualificationsSummary);
      try {
        const createSucess = await Api.createQualificationsSummary(
          qualificationsSummary
        );

        if (createSucess) {
          navigation.replace("ResumeScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error(
          "Error saving qualifications summary to AsyncStorage:",
          error
        );
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
      const data = await Api.getQualificationsSummary();
      if (data != null) {
        setQualificationsSummary(data);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadOjectiveFromStorage().t;
  }, []);

  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Header
          title={"Resumo de Qualificações"}
          screenReplace={"ResumeScreen"}
        />
        <View style={styles.inputContainer}>
          <CustomTextArea
            value={qualificationsSummary}
            onChangeText={setQualificationsSummary}
            placeholder={
              "Resumo sobre suas competências e seus diferenciais relevantes para a vaga."
            }
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
  footer: {
    marginTop: 20,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
});
