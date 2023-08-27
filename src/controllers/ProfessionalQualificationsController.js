import AsyncStorage from "@react-native-async-storage/async-storage";
import FormatString from "../services/FormatString";

const getExistingQualifications = async () => {
  try {
    //Recupera dados
    const existingQualificationsJSON = await AsyncStorage.getItem(
      "professionalqualifications"
    );

    // Converte em JSON
    const existingQualifications = existingQualificationsJSON
      ? JSON.parse(existingQualificationsJSON)
      : [];

    return existingQualifications;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  createQualification: async (professionalQualification) => {
    try {
      const { title, description } = professionalQualification;
      const titleFormat = await FormatString(title);

      // Cria o objeto
      const newQualification = {
        title: titleFormat,
        description,
      };

      // Recupera
      const existingQualifications = await getExistingQualifications();

      // Verifica se já existe na lista
      const existingIndex = existingQualifications.findIndex(
        (item) => item.title === titleFormat
      );

      // Se já existe, atualiza . Se é novo, adiciona à lista
      if (existingIndex !== -1) {
        existingQualifications[existingIndex].description = description;
      } else {
        existingQualifications.push(newQualification);
      }

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem(
        "professionalqualifications",
        JSON.stringify(existingQualifications)
      );

      return true;
    } catch (error) {
      console.error(
        "Error saving professional qualifications to AsyncStorage:",
        error
      );
      return false;
    }
  },

  getQualifications: async () => {
    try {
      // Recupera qualificações
      const existingQualifications = await getExistingQualifications();

      return existingQualifications;
    } catch (error) {
      console.error(
        "Error loading professional qualifications from AsyncStorage:",
        error
      );
      return [];
    }
  },

  deleteQualification: async (title) => {
    try {
      //Recupera
      const existingQualifications = await getExistingQualifications();

      const updatedQualifications = existingQualifications.filter(
        (qualification) => qualification.title !== title
      );

      await AsyncStorage.setItem(
        "professionalqualifications",
        JSON.stringify(updatedQualifications)
      );
      return true;
    } catch (error) {
      console.error(
        "Error deleting professional qualification from AsyncStorage:",
        error
      );
      return false;
    }
  },
};
