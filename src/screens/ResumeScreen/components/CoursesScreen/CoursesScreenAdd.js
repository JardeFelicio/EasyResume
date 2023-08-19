import { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import CustomInput from "../../../../components/CustomInput";
import DateInput from "../../../../components/DateInput";
import Footer from "../../../../components/Footer";
import Api from "../../../../controllers/CoursesController";

export function CoursesScreenAdd({ route }) {
  const navigation = useNavigation();

  const selectedItem = route.params ? route.params.selectedItem : false;

  const [courseName, setcourseName] = useState(
    selectedItem ? selectedItem.courseName : ""
  );
  const [institution, setInstitution] = useState(
    selectedItem ? selectedItem.institution : ""
  );
  const [workload, setWorkload] = useState(
    selectedItem ? selectedItem.workload : ""
  );
  const [startDate, setStartDate] = useState(
    selectedItem.startDate ? new Date(selectedItem.startDate) : ""
  );

  const [endDate, setEndDate] = useState(
    selectedItem ? new Date(selectedItem.endDate) : new Date()
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (courseName !== "" && institution !== "" && endDate !== "") {
      try {
        const createSucess = await Api.createCourse({
          courseName: courseName,
          institution: institution,
          workload: workload,
          startDate: startDate,
          endDate: endDate,
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
    navigation.replace("CoursesScreen");
  };

  const handleDelete = async () => {
    try {
      const deleteSucess = await Api.deleteCourse(selectedItem.courseName);
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
      <Header
        title={selectedItem ? "Editar Curso" : "Adicionar Curso"}
        screenReplace={"CoursesScreen"}
        goBackScreen={true}
      />
      <View style={styles.inputContainer}>
        <CustomInput
          value={courseName}
          onChangeText={setcourseName}
          placeholder={"Nome do curso"}
        />
        <CustomInput
          value={institution}
          onChangeText={setInstitution}
          placeholder={"Instituição"}
        />
        <CustomInput
          value={workload}
          onChangeText={setWorkload}
          placeholder={"Carga horária (opcional)"}
        />
        <DateInput
          value={startDate}
          isOptional={true}
          onChangeDate={setStartDate}
          label={"Data de inicio (opcional)"}
        />
        <DateInput
          value={endDate}
          onChangeDate={setEndDate}
          label={"Data de término (ou prevista)"}
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
