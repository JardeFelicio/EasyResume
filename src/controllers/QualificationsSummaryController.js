import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "qualificationsSummary";

export default {
  createQualificationsSummary: async (qualificationsSummary) => {
    try {
      const qualificationsSummaryFormat = qualificationsSummary.trim();

      // Salva no AsyncStorage
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(qualificationsSummaryFormat)
      );

      return true;
    } catch (error) {
      console.error(
        "Error saving qualifications summary to AsyncStorage:",
        error
      );
      return false;
    }
  },

  getQualificationsSummary: async () => {
    try {
      // Recupera o resumo de qualificações
      const existingQualificationsSummaryJSON = await AsyncStorage.getItem(
        STORAGE_KEY
      );

      if (existingQualificationsSummaryJSON) {
        // Converte em JSON
        const existingQualificationsSummary = JSON.parse(
          existingQualificationsSummaryJSON
        );
        return existingQualificationsSummary;
      } else {
        return null; // Retorna null se não há dados encontrados
      }
    } catch (error) {
      console.error(
        "Error loading qualifications summary from AsyncStorage:",
        error
      );
      return null; // Retorna null em caso de erro
    }
  },
};
