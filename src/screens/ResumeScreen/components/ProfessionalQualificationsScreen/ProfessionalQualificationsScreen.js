import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import AddButton from "../../../../components/AddButton";
import ListItemData from "../../../../components/ListItemData";
import Api from "../../../../controllers/ProfessionalQualificationsController";

export function ProfessionalQualificationsScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [coursesList, setCoursesList] = useState([]);

  async function loadCoursesFromStorage() {
    try {
      const data = await Api.getQualifications();
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
    navigation.navigate("ProfessionalQualificationsScreenAdd");
  };

  function renderItemList({ item }) {
    const handleSubmitItem = () => {
      navigation.navigate("ProfessionalQualificationsScreenAdd", {
        selectedItem: item,
      });
    };
    return (
      <ListItemData
        textItem={item.title}
        infoItem={item.description.substring(0, 25) + "..."}
        onPress={handleSubmitItem}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Qualificações"} screenReplace={"ResumeScreen"} />
      <View style={styles.bodyContainer}>
        <FlatList
          data={coursesList}
          renderItem={renderItemList}
          keyExtractor={(item) => item.qualificationTitle}
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
