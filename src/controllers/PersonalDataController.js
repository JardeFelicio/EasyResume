import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  createPersonalData: async (personalData) => {
    try {
      if (personalData === null) {
        return;
      }
      // Salva no AsyncStorage
      await AsyncStorage.setItem("personaldata", JSON.stringify(personalData));

      return true;
    } catch (error) {
      console.error("Error saving personal data to AsyncStorage:", error);
      return false;
    }
  },

  getPersonalData: async () => {
    try {
      // Recupera
      const existingPersonalDataJSON = await AsyncStorage.getItem(
        "personaldata"
      );
      // Converte em JSON
      const existingPersonalData = existingPersonalDataJSON
        ? JSON.parse(existingPersonalDataJSON)
        : [];
      return existingPersonalData;
    } catch (error) {
      console.error("Error loading personal data from AsyncStorage:", error);
      return "";
    }
  },
};
