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
        existingEducational[existingIndex].degree = degree;
        existingEducational[existingIndex].institution = institution;
        existingEducational[existingIndex].startDate = startDate;
        existingEducational[existingIndex].endDate = endDate;
        existingEducational[existingIndex].courseStatus = courseStatus;
        existingEducational[existingIndex].coursePeriod = coursePeriod;
      } else {
        existingEducational.push(newEducational);
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
      const courseName = course;

      const existingEducational = await getExistingEducational();

      const updatedEducational = existingEducational.filter(
        (course) => course.course !== courseName
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
