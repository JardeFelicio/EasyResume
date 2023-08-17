import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
  createObjective: async (objective) => {
    try {
      const objectiveText = objective;

      const objectiveFormat = objectiveText.trim();

      // Salva no AsyncStorage
      await AsyncStorage.setItem("objective", JSON.stringify(objectiveFormat));

      return true;
    } catch (error) {
      console.error("Error saving objective to AsyncStorage:", error);
      return false;
    }
  },

  getObjective: async () => {
    try {
      // Recupera objetivo
      const existingObjectiveJSON = await AsyncStorage.getItem("objective");
      // Converte em JSON
      const existingObjective = existingObjectiveJSON
        ? JSON.parse(existingObjectiveJSON)
        : [];
      return existingObjective;
    } catch (error) {
      console.error("Error loading objective from AsyncStorage:", error);
      return "";
    }
  },
};
