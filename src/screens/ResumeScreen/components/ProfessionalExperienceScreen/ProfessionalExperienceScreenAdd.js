import { useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";

import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import CustomTextArea from "../../../../components/CustomTextArea";
import DateInput from "../../../../components/DateInput";
import CustomCheckBox from "../../../../components/CustomCheckBox";
import CustomInputPicker from "../../../../components/CustomInputPicker";
import Footer from "../../../../components/Footer";

import Api from "../../../../controllers/ProfessionalExperienceController";

export function ProfessionalExperienceScreenAdd({ route }) {
  const navigation = useNavigation();
  const selectedItem = route.params ? route.params.selectedItem : false;

  const [title, setTitle] = useState(selectedItem ? selectedItem.title : "");
  const [company, setCompany] = useState(
    selectedItem ? selectedItem.company : ""
  );

  const employmentTypeOptions = [
    "Tempo integral",
    "Meio período",
    "Autônomo",
    "Freelance",
    "Temporário",
    "Estágio",
    "Aprendiz",
    "Trainee",
    "Terceirizado",
  ];
  const [selectedEmploymentType, setSelectedemploymentType] = useState(
    selectedItem ? selectedItem.employmentType : ""
  );

  const [locality, setLocality] = useState(
    selectedItem ? selectedItem.locality : ""
  );
  const [startDate, setStartDate] = useState(
    selectedItem.startDate ? new Date(selectedItem.startDate) : new Date()
  );

  const [currentlyWork, setCurrentlyWork] = useState(
    selectedItem ? selectedItem.currentlyWork : false
  );

  const [endDate, setEndDate] = useState(
    selectedItem ? new Date(selectedItem.endDate) : new Date()
  );
  const workFormatOptions = ["Presencial", "Híbrido", "Remoto"];
  const [selectedWorkFormat, setSelectedWorkFormat] = useState(
    selectedItem ? selectedItem.workFormat : ""
  );
  const [description, setDescription] = useState(
    selectedItem ? selectedItem.description : ""
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (
      title !== "" &&
      company !== "" &&
      startDate !== "" &&
      (endDate !== "" || currentlyWork !== true)
    ) {
      try {
        const createSucess = await Api.createExperience({
          title,
          company,
          employmentType: selectedEmploymentType,
          locality,
          startDate,
          endDate,
          currentlyWork,
          workFormat: selectedWorkFormat,
          description,
        });

        if (createSucess) {
          navigation.goBack("ProfessionalExperienceScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error("Error saving experience to AsyncStorage:", error);
      }
    } else {
      setErrorMessage("Preencha todos os campos");
    }
  };

  const handleSubmitCancel = () => {
    navigation.goBack("ProfessionalExperienceScreen");
  };

  const handleDelete = async () => {
    try {
      const deleteSucess = await Api.deleteExperience({
        title: selectedItem.title,
        company: selectedItem.company,
      });
      if (deleteSucess) {
        navigation.goBack("ProfessionalExperienceScreen");
      } else {
        console.log("Erro:", deleteSucess);
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Header
          title={selectedItem ? "Editar Experiência" : "Adicionar Experiência"}
          screenReplace={"ProfessionalExperienceScreen"}
          goBackScreen={true}
        />
      </View>
      <ScrollView style={styles.scroww}>
        <View style={styles.inputContainer}>
          <CustomInput
            value={title}
            onChangeText={setTitle}
            placeholder={"Titulo"}
          />
          <CustomInput
            value={company}
            onChangeText={setCompany}
            placeholder={"Nome da empresa"}
          />

          <CustomInputPicker
            selectedValue={selectedEmploymentType}
            onValueChange={(itemValue) => setSelectedemploymentType(itemValue)}
            inputOptions={employmentTypeOptions}
            labelPlaceHolder={"Selecione o tipo de emprego"}
          />
          <CustomInput
            value={locality}
            onChangeText={setLocality}
            placeholder={"Localidade"}
          />
          <CustomInputPicker
            selectedValue={selectedWorkFormat}
            onValueChange={(itemValue) => setSelectedWorkFormat(itemValue)}
            inputOptions={workFormatOptions}
            labelPlaceHolder={"Selecione o tipo de emprego"}
          />

          <DateInput
            value={startDate}
            onChangeDate={setStartDate}
            label={"Data de inicio"}
          />
          <CustomCheckBox
            value={currentlyWork}
            onChecked={setCurrentlyWork}
            placeholder={"Trabalho atualmente neste cargo"}
          />
          {!currentlyWork && (
            <DateInput
              value={endDate}
              onChangeDate={setEndDate}
              label={"Data de término"}
            />
          )}
          <CustomTextArea
            value={description}
            onChangeText={setDescription}
            placeholder={"Descrição"}
          />
        </View>
      </ScrollView>
      <View style={styles.footerArea}>
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
    flexDirection: "column",
  },
  headerArea: { alignItems: "center", width: "100%" },
  scroww: { flex: 1, width: "100%", paddingHorizontal: 30 },
  inputContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    gap: 14,
  },
  footerArea: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
