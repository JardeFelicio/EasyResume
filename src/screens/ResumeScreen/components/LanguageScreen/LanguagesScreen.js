import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import AddButton from "../../../../components/AddButton";
import ListItemData from "../../../../components/ListItemData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../../../controllers/LanguagesController";

export function LanguagesScreen({ route }) {
  const loadRefresh = route.params ? route.params.loadRefresh : false;

  const navigation = useNavigation();
  const [languageList, setLanguageList] = useState([]);

  async function loadLanguagesFromStorage() {
    const data = await Api.getLanguages();
    return data;
  }

  useEffect(() => {
    loadLanguagesFromStorage()
      .then((data) => {
        setLanguageList(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmitAdd = () => {
    navigation.navigate("LanguagesScreenAdd");
  };

  function renderItemList({ item }) {
    const handleSubmitItem = () => {
      navigation.navigate("LanguagesScreenAdd", { selectedItem: item });
    };
    return (
      <ListItemData
        textItem={item.languageName}
        infoItem={item.fluencyLevel}
        onPress={handleSubmitItem}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Idiomas"} screenReplace={"ResumeScreen"} />
      <View style={styles.bodyContainer}>
        <FlatList
          data={languageList}
          renderItem={renderItemList}
          keyExtractor={(item) => item.languageName}
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
