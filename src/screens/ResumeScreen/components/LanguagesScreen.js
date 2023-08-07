import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../config/Colors";

import Header from "../../../components/Header";

import CustomInputPicker from "../../../components/CustomInputPicker";
import CustomInput from "../../../components/CustomInput";
import Footer from "../../../components/Footer";

export function LanguagesScreen() {
  const [language, setLanguage] = useState("");
  const [selectedFluency, setSelectedFluency] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fluencyOptions = ["Básico", "Intermediário ", "Avançado", "Fluente"];

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (language !== "" && selectedFluency !== "") {
      setTimeout(() => {
        navigation.replace("ResumeScreen");
      }, 2000);
    } else {
      setErrorMessage("Preencha todos os campos");
    }
  };

  const handleSubmitCancel = () => {
    navigation.replace("ResumeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Idiomas"} screenReplace={"ResumeScreen"} />
      <View style={styles.inputContainer}>
        <CustomInput
          value={language}
          onChangeText={setLanguage}
          placeholder={"Idioma"}
        />

        <CustomInputPicker
          selectedValue={selectedFluency}
          onValueChange={(itemValue) => setSelectedFluency(itemValue)}
          fluencyOptions={fluencyOptions}
          labelPlaceHolder={"Selecione o nivel"}
        />
      </View>
      <Footer onPressSave={handleSubmit} onPressCancel={handleSubmitCancel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  inputContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 16,
  },
});
