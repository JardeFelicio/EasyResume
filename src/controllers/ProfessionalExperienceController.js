import AsyncStorage from "@react-native-async-storage/async-storage";
import FormatString from "../services/FormatString";

const getExistingExperience = async () => {
  try {
    //Recupera dados
    const existingExperiencelJSON = await AsyncStorage.getItem("experience");

    // Converte em JSON
    const existingExperience = existingExperiencelJSON
      ? JSON.parse(existingExperiencelJSON)
      : [];

    return existingExperience;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  createExperience: async (experience) => {
    try {
      const {
        degree,
        course,
        institution,
        startDate,
        endDate,
        courseStatus,
        coursePeriod,
      } = experience;

      const courseFormat = await FormatString(course);

      // Cria o objeto
      const newExperience = {
        degree,
        course: courseFormat,
        institution,
        startDate,
        endDate,
        courseStatus,
        coursePeriod,
      };

      // Recupera os dados
      const existingExperience = await getExistingExperience();

      // Verifica se o curso já existe na lista
      const existingIndex = existingExperience.findIndex(
        (item) => item.course === courseFormat
      );

      // Se o curso já existe, atualiza . Se o curso é novo, adiciona à lista
      if (existingIndex !== -1) {
        existingExperience[existingIndex].degree = degree;
        existingExperience[existingIndex].institution = institution;
        existingExperience[existingIndex].startDate = startDate;
        existingExperience[existingIndex].endDate = endDate;
        existingExperience[existingIndex].courseStatus = courseStatus;
        existingExperience[existingIndex].coursePeriod = coursePeriod;
      } else {
        existingExperience.push(newExperience);
      }

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem(
        "experience",
        JSON.stringify(existingExperience)
      );

      return true;
    } catch (error) {
      console.error("Error saving experience to AsyncStorage:", error);
      return false;
    }
  },

  getExperience: async () => {
    try {
      // Recupera
      const existingExperience = await getExistingExperience();

      return existingExperience;
    } catch (error) {
      console.error("Error loading experience from AsyncStorage:", error);
      return [];
    }
  },

  deleteExperience: async (experience) => {
    try {
      //Recupera languages
      const courseName = experience;

      const existingExperience = await getExistingExperience();

      const updatedExperience = existingExperience.filter(
        (course) => course.course !== courseName
      );

      await AsyncStorage.setItem(
        "educational",
        JSON.stringify(updatedExperience)
      );
      return true;
    } catch (error) {
      console.error("Error deleting experience from AsyncStorage:", error);
      return false;
    }
  },
};
