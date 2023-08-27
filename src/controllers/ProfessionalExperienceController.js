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

    console.log("Controller: ", 14, existingExperience);
    return existingExperience;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  createExperience: async (experience) => {
    try {
      console.log("Controller create: ", 25, experience);
      const {
        title,
        company,
        employmentType,
        locality,
        startDate,
        endDate,
        currentlyWork,
        workFormat,
        description,
      } = experience;

      const titleFormat = await FormatString(title);
      const companyFormat = await FormatString(company);

      // Cria o objeto
      const newExperience = {
        title: titleFormat,
        company: companyFormat,
        employmentType,
        locality,
        startDate,
        endDate,
        currentlyWork,
        workFormat,
        description,
      };

      // Recupera os dados
      const existingExperience = await getExistingExperience();

      // Verifica se o curso já existe na lista
      const existingIndex = existingExperience.findIndex(
        (item) => item.title === title && item.company === company
      );

      // Se já existe, atualiza . Se é novo, adiciona à lista
      if (existingIndex !== -1) {
        existingExperience[existingIndex].title = titleFormat;
        existingExperience[existingIndex].company = companyFormat;
        existingExperience[existingIndex].employmentType = employmentType;
        existingExperience[existingIndex].locality = locality;
        existingExperience[existingIndex].startDate = startDate;
        existingExperience[existingIndex].endDate = endDate;
        existingExperience[existingIndex].currentlyWork = currentlyWork;
        existingExperience[existingIndex].workFormat = workFormat;
        existingExperience[existingIndex].description = description;
        od;
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
      const { title, company } = experience;
      console.log("Controller delete: ", 107, experience);

      const existingExperience = await getExistingExperience();

      const updatedExperience = existingExperience.filter(
        (experience) =>
          experience.title !== title && experience.company !== company
      );

      await AsyncStorage.setItem(
        "experience",
        JSON.stringify(updatedExperience)
      );
      return true;
    } catch (error) {
      console.error("Error deleting experience from AsyncStorage:", error);
      return false;
    }
  },
};
