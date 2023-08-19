import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import AddButton from "../../../../components/AddButton";
import ListItemData from "../../../../components/ListItemData";
import Api from "../../../../controllers/CoursesController";

export function CoursesScreen({ route }) {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [coursesList, setCoursesList] = useState([]);

  async function loadCoursesFromStorage() {
    try {
      const data = await Api.getCourses();
      setCoursesList(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCoursesFromStorage();
  }, [isFocused]);
  const handleSubmitAdd = () => {
    navigation.navigate("CoursesScreenAdd");
  };

  function renderItemList({ item }) {
    const handleSubmitItem = () => {
      navigation.navigate("CoursesScreenAdd", { selectedItem: item });
    };
    return (
      <ListItemData
        textItem={item.courseName}
        infoItem={item.institution}
        onPress={handleSubmitItem}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Cursos"} screenReplace={"ResumeScreen"} />
      <View style={styles.bodyContainer}>
        <FlatList
          data={coursesList}
          renderItem={renderItemList}
          keyExtractor={(item) => item.courseName}
          contentContainerStyle={styles.flatListBody}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <AddButton onPressAdd={handleSubmitAdd} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  inputContainer: {
    paddingHorizontal: 30,
    marginTop: 30,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 16,
  },
  bodyContainer: {
    width: "90%",
    marginTop: "5%",
    marginBottom: "5%",
    flex: 1,
  },
});
