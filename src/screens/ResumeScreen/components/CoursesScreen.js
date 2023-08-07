import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../config/Colors";

import Header from "../../../components/Header";
import CustomInputPicker from "../../../components/CustomInputPicker";
import Footer from "../../../components/Footer";

export function CourseScreen() {
  const [course, setCourse] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const statusOptions = ["Cursando", "Concluído"];

  const navigation = useNavigation();

  const handleSubmit = () => {
    if (course !== "" && selectedStatus !== "") {
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
      <Header title={"Cursos"} screenReplace={"ResumeScreen"} />
      <View style={styles.inputContainer}>
        <CustomInputPicker
          selectedValue={selectedStatus}
          onValueChange={(itemValue) => setSelectedStatus(itemValue)}
          fluencyOptions={statusOptions}
          labelPlaceHolder={"Selecione o status"}
        />
      </View>
      {/* <Footer onPressSave={handleSubmit} onPressCancel={handleSubmitCancel} /> */}
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
