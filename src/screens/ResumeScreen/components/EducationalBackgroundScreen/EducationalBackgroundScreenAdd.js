import { useState } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import DateInput from "../../../../components/DateInput";
import CustomInputPicker from "../../../../components/CustomInputPicker";
import Footer from "../../../../components/Footer";
import Api from "../../../../controllers/EducationalBackgroundController";

export function EducationalBackgroundScreenAdd({ route }) {
  const navigation = useNavigation();
  const selectedItem = route.params ? route.params.selectedItem : false;
  const [course, setCourse] = useState(selectedItem ? selectedItem.course : "");
  const [institution, setInstitution] = useState(
    selectedItem ? selectedItem.institution : ""
  );
  const [startDate, setStartDate] = useState(
    selectedItem.startDate ? new Date(selectedItem.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    selectedItem ? new Date(selectedItem.endDate) : new Date()
  );
  const statusOptions = ["Cursando", "Concluído", "Incompleto"];
  const [selectedStatus, setSelectedStatus] = useState(
    selectedItem ? selectedItem.courseStatus : ""
  );
  const periodOptions = ["Manhã", "Tarde", "Noite"];
  const [selectedPeriod, setSelectedPeriod] = useState(
    selectedItem ? selectedItem.coursePeriod : ""
  );
  const degreeOptions = [
    "Ensino Fundamental",
    "Ensino Médio",
    "Graduação",
    "Pós-Graduação",
    "Técnico",
    "Especialização",
    "MBA",
    "Mestrado",
    "Doutorado",
    "Pós-Doutorado",
  ];
  const [selectedDegree, setSelectedDegree] = useState(
    selectedItem ? selectedItem.degree : ""
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (
      course !== "" &&
      institution !== "" &&
      endDate !== "" &&
      selectedStatus !== ""
    ) {
      try {
        const createSucess = await Api.createEducational({
          degree: selectedDegree,
          course,
          institution,
          startDate,
          endDate,
          courseStatus: selectedStatus,
          coursePeriod: selectedPeriod,
        });

        if (createSucess) {
          navigation.replace("CoursesScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error("Error saving course to AsyncStorage:", error);
      }
    } else {
      setErrorMessage("Preencha todos os campos");
    }
  };

  const handleSubmitCancel = () => {
    navigation.replace("EducationalBackgroundScreen");
  };

  const handleDelete = async () => {
    try {
      const deleteSucess = await Api.deleteCourse(selectedItem.course);
      if (deleteSucess) {
        navigation.replace("CoursesScreen");
      } else {
        console.log("Erro:", deleteSucess);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Header
          title={selectedItem ? "Editar Formação" : "Adicionar Formação"}
          screenReplace={"EducationalBackgroundScreen"}
          goBackScreen={true}
        />
      </View>
      <ScrollView style={styles.scroww}>
        <View style={styles.inputContainer}>
          <CustomInputPicker
            selectedValue={selectedDegree}
            onValueChange={(itemValue) => setSelectedDegree(itemValue)}
            inputOptions={degreeOptions}
            labelPlaceHolder={"Selecione o nivel"}
          />
          <CustomInput
            value={course}
            onChangeText={setCourse}
            placeholder={"Nome do curso"}
          />
          <CustomInput
            value={institution}
            onChangeText={setInstitution}
            placeholder={"Instituição"}
          />
          <DateInput
            value={startDate}
            onChangeDate={setStartDate}
            label={"Data de inicio"}
          />
          <DateInput
            value={endDate}
            onChangeDate={setEndDate}
            label={"Data de término (ou prevista)"}
          />
          <CustomInputPicker
            selectedValue={selectedStatus}
            onValueChange={(itemValue) => setSelectedStatus(itemValue)}
            inputOptions={statusOptions}
            labelPlaceHolder={"Selecione o status"}
          />
          <CustomInputPicker
            selectedValue={selectedPeriod}
            onValueChange={(itemValue) => setSelectedPeriod(itemValue)}
            inputOptions={periodOptions}
            labelPlaceHolder={"Selecione o período"}
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
