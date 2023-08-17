import AsyncStorage from "@react-native-async-storage/async-storage";
import FormatString from "../services/FormatString";

const getExistingEducational = async () => {
  try {
    //Recupera dados
    const existingEducationalJSON = await AsyncStorage.getItem("educational");

    // Converte em JSON
    const existingEducational = existingEducationalJSON
      ? JSON.parse(existingEducationalJSON)
      : [];

    return existingEducational;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  createEducational: async (educational) => {
    try {
      console.log(educational);

      const {
        degree,
        course,
        institution,
        startDate,
        endDate,
        courseStatus,
        coursePeriod,
      } = educational;

      const courseFormat = await FormatString(course);

      // Cria o objeto
      const newEducational = {
        degree,
        course: courseFormat,
        institution,
        startDate,
        endDate,
        courseStatus,
        coursePeriod,
      };

      // Recupera os dados
      const existingEducational = await getExistingEducational();

      // Verifica se o curso já existe na lista
      const existingIndex = existingEducational.findIndex(
        (item) => item.course === courseFormat
      );

      // Se o curso já existe, atualiza . Se o curso é novo, adiciona à lista
      if (existingIndex !== -1) {
        existingCourses[existingIndex].degree = degree;
        existingCourses[existingIndex].institution = institution;
        existingCourses[existingIndex].startDate = startDate;
        existingCourses[existingIndex].endDate = endDate;
        existingCourses[existingIndex].courseStatus = courseStatus;
        existingCourses[existingIndex].coursePeriod = coursePeriod;
      } else {
        existingCourses.push(newEducational);
      }

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem(
        "educational",
        JSON.stringify(existingEducational)
      );

      return true;
    } catch (error) {
      console.error("Error saving educational to AsyncStorage:", error);
      return false;
    }
  },

  getEducational: async () => {
    try {
      // Recupera
      const existingEducational = await getExistingEducational();

      return existingEducational;
    } catch (error) {
      console.error("Error loading educational from AsyncStorage:", error);
      return [];
    }
  },

  deleteEducational: async (course) => {
    try {
      //Recupera languages
      const existingEducational = await getExistingEducational();

      const updatedEducational = existingEducational.filter(
        (course) => course.course !== course
      );

      await AsyncStorage.setItem(
        "educational",
        JSON.stringify(updatedEducational)
      );
      return true;
    } catch (error) {
      console.error("Error deleting educational from AsyncStorage:", error);
      return false;
    }
  },
};
