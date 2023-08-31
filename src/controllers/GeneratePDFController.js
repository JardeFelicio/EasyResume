import AsyncStorage from "@react-native-async-storage/async-storage";

const getPDFDataFromStorage = async () => {
  try {
    const data = {
      additional: [],
      courses: [],
      educational: [],
      experience: [],
      languages: [],
      objective: [],
      personaldata: [],
      professionalqualifications: [],
      qualificationsSummary: [],
    };

    for (const key of Object.keys(data)) {
      const resume = await AsyncStorage.getItem(key);
      if (resume) {
        data[key] = JSON.parse(resume); // Parse the JSON string
      }
    }

    return data;
  } catch (error) {
    console.error("Error getting all resumes:", error);
    return [];
  }
};

export default {
  getAll: async () => {
    try {
      const data = await getPDFDataFromStorage();

      return data;
    } catch (error) {
      console.error("Error getting all resumes:", error);
      return [];
    }
  },

  hasEssentialData: async () => {
    const data = await getPDFDataFromStorage();

    const essentialFields = [
      "personaldata",
      "objective",
      "educational",
      "experience",
    ];

    for (const field of essentialFields) {
      if (!data[field]) {
        return false;
      }
    }

    return true;
  },
};
