import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import AddButton from "../../../../components/AddButton";
import ListItemData from "../../../../components/ListItemData";
import Api from "../../../../controllers/ProfessionalExperienceController";

export function ProfessionalExperienceScreen() {
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const [experienceList, setExperienceList] = useState([]);

  async function loadExperienceFromStorage() {
    try {
      const data = await Api.getExperience();
      setExperienceList(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadExperienceFromStorage();
  }, [isFocused]);

  const handleSubmitAdd = () => {
    navigation.navigate("ProfessionalExperienceScreenAdd");
  };

  function renderItemList({ item }) {
    const handleSubmitItem = () => {
      navigation.navigate("ProfessionalExperienceScreenAdd", {
        selectedItem: item,
      });
    };
    return (
      <ListItemData
        textItem={item.course}
        infoItem={item.institution}
        onPress={handleSubmitItem}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Experiência Profissional"}
        screenReplace={"ResumeScreen"}
      />
      <View style={styles.bodyContainer}>
        <FlatList
          data={experienceList}
          renderItem={renderItemList}
          keyExtractor={(item) => item.course}
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
