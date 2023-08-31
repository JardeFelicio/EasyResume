import AsyncStorage from "@react-native-async-storage/async-storage";
import Format from "../services/FormatString";

const getExistingCourses = async () => {
  try {
    //Recupera dados
    const existingCoursesJSON = await AsyncStorage.getItem("courses");

    // Converte em JSON
    const existingCourses = existingCoursesJSON
      ? JSON.parse(existingCoursesJSON)
      : [];

    return existingCourses;
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

export default {
  createCourse: async (course) => {
    try {
      const { courseName, institution, workload, startDate, endDate } = course;

      const courseNameFormat = await Format.formatString(courseName);

      // Cria o objeto
      const newCourse = {
        courseName: courseNameFormat,
        institution: institution,
        workload: workload,
        startDate: startDate,
        endDate: endDate,
      };

      // Recupera os dados
      const existingCourses = await getExistingCourses();

      // Verifica se o curso já existe na lista
      const existingIndex = existingCourses.findIndex(
        (item) => item.courseName === courseNameFormat
      );

      // Se o idioma já existe, atualiza apenas a fluência. Se o idioma é novo, adiciona à lista
      if (existingIndex !== -1) {
        existingCourses[existingIndex].institution = institution;
        existingCourses[existingIndex].workload = workload;
        existingCourses[existingIndex].startDate = startDate;
        existingCourses[existingIndex].endDate = endDate;
      } else {
        existingCourses.push(newCourse);
      }

      // Salva a lista atualizada no AsyncStorage
      await AsyncStorage.setItem("courses", JSON.stringify(existingCourses));

      return true;
    } catch (error) {
      console.error("Error saving course to AsyncStorage:", error);
      return false;
    }
  },

  getCourses: async () => {
    try {
      // Recupera languages
      const existingCourses = await getExistingCourses();

      return existingCourses;
    } catch (error) {
      console.error("Error loading course from AsyncStorage:", error);
      return [];
    }
  },

  deleteCourse: async (courseName) => {
    try {
      //Recupera languages
      const existingCourses = await getExistingCourses();

      const updatedCourses = existingCourses.filter(
        (course) => course.courseName !== courseName
      );

      await AsyncStorage.setItem("courses", JSON.stringify(updatedCourses));
      return true;
    } catch (error) {
      console.error("Error deleting course from AsyncStorage:", error);
      return false;
    }
  },

  deleteAllCourses: async () => {
    try {
      //Recupera languages

      await AsyncStorage.setItem("courses", JSON.stringify([]));
      return true;
    } catch (error) {
      console.error("Error deleting course from AsyncStorage:", error);
      return false;
    }
  },
};
