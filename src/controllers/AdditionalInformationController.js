import AsyncStorage from "@react-native-async-storage/async-storage";

const getExistingAdditional = async () => {
  try {
    //Recupera dados
    const existingAdditionalJSON = await AsyncStorage.getItem("additional");

    // Converte em JSON
    const existingAdditional = existingAdditionalJSON
      ? JSON.parse(existingAdditionalJSON)
      : [];

    return existingAdditional;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  createAdditional: async (information) => {
    try {
      console.log(information);

      // Cria o objeto
      const newAdditional = {
        information,
      };

      // Recupera
      const existingAdditional = await getExistingAdditional();

      // Verifica se já existe na lista
      const existingIndex = existingAdditional.findIndex(
        (item) => item.information === information
      );

      // Se já existe, atualiza . Se é novo, adiciona à lista
      if (existingIndex !== -1) {
        existingAdditional[existingIndex].information = information;
      } else {
        existingAdditional.push(newAdditional);
      }

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem(
        "additional",
        JSON.stringify(existingAdditional)
      );

      return true;
    } catch (error) {
      console.error(
        "Error saving additional information to AsyncStorage:",
        error
      );
      return false;
    }
  },

  getAdditional: async () => {
    try {
      // Recupera
      const existingAdditional = await getExistingAdditional();

      return existingAdditional;
    } catch (error) {
      console.error(
        "Error loading additional information from AsyncStorage:",
        error
      );
      return [];
    }
  },

  deleteAdditional: async (information) => {
    try {
      //Recupera
      const existingAdditional = await getExistingAdditional();

      const updatedAdditional = existingAdditional.filter(
        (additional) => additional.information !== information
      );

      await AsyncStorage.setItem(
        "additional",
        JSON.stringify(updatedAdditional)
      );
      return true;
    } catch (error) {
      console.error(
        "Error deleting additional information from AsyncStorage:",
        error
      );
      return false;
    }
  },
  deleteAdditionalAll: async () => {
    try {
      //Recupera

      await AsyncStorage.setItem("additional", JSON.stringify([]));
      return true;
    } catch (error) {
      console.error(
        "Error deleting additional all information from AsyncStorage:",
        error
      );
      return false;
    }
  },
};
