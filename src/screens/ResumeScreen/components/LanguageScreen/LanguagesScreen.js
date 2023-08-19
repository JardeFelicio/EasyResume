import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import AddButton from "../../../../components/AddButton";
import ListItemData from "../../../../components/ListItemData";
import Api from "../../../../controllers/LanguagesController";

export function LanguagesScreen() {
  // Dentro do componente da tela
  const navigation = useNavigation();
  const navigationState = navigation.getState(); // Obter o estado da navegação

  // Nome da tela que você quer verificar
  const screenNameToCheck = "LanguagesScreen";

  // Filtrar o histórico de navegação para encontrar instâncias da mesma tela
  const instancesOfScreen = navigationState.routes.filter(
    (route) => route.name === screenNameToCheck
  );

  console.log(
    `Número de instâncias de ${screenNameToCheck}:`,
    instancesOfScreen.length
  );

  const isFocused = useIsFocused();

  const [languageList, setLanguageList] = useState([]);

  const loadLanguagesFromStorage = async () => {
    try {
      const data = await Api.getLanguages();
      setLanguageList(data);

      console.log(21, languageList);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(29, languageList);
    console.log(26, new Date());
    loadLanguagesFromStorage();
  }, [isFocused]);

  const handleSubmitAdd = () => {
    navigation.navigate("LanguagesScreenAdd");
  };

  function renderItemList({ item }) {
    const handleSubmitItem = () => {
      navigation.replace("LanguagesScreenAdd", { selectedItem: item });
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
