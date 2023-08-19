import AsyncStorage from "@react-native-async-storage/async-storage";
import FormatString from "../services/FormatString";

const getExistingLanguages = async () => {
  try {
    //Recupera dados
    const existingLanguagesJSON = await AsyncStorage.getItem("languages");

    // Converte em JSON
    const existingLanguages = existingLanguagesJSON
      ? JSON.parse(existingLanguagesJSON)
      : [];

    return existingLanguages;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  createLanguage: async (languageName, fluencyLevel) => {
    try {
      const languageNameFormat = await FormatString(languageName);

      // Cria o objeto newLanguage
      const newLanguage = {
        languageName: languageNameFormat,
        fluencyLevel: fluencyLevel,
      };

      // Recupera languages
      const existingLanguages = await getExistingLanguages();

      // Verifica se o idioma já existe na lista
      const existingIndex = existingLanguages.findIndex(
        (item) => item.languageName === languageNameFormat
      );

      // Se o idioma já existe, atualiza apenas a fluência. Se o idioma é novo, adiciona à lista
      if (existingIndex !== -1) {
        existingLanguages[existingIndex].fluencyLevel = fluencyLevel;
      } else {
        existingLanguages.push(newLanguage);
      }

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem(
        "languages",
        JSON.stringify(existingLanguages)
      );

      return true;
    } catch (error) {
      console.error("Error saving language to AsyncStorage:", error);
      return false;
    }
  },

  getLanguages: async () => {
    try {
      // Recupera languages
      const existingLanguages = await getExistingLanguages();
      console.log(64, existingLanguages);
      return existingLanguages;
    } catch (error) {
      console.error("Error loading languages from AsyncStorage:", error);
      return [];
    }
  },

  deleteLanguage: async (languageName) => {
    try {
      //Recupera languages
      const existingLanguages = await getExistingLanguages();

      const updatedLanguages = existingLanguages.filter(
        (language) => language.languageName !== languageName
      );

      await AsyncStorage.setItem("languages", JSON.stringify(updatedLanguages));
      return true;
    } catch (error) {
      console.error("Error deleting language from AsyncStorage:", error);
      return false;
    }
  },
};
