import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import AddButton from "../../../../components/AddButton";
import ListItemData from "../../../../components/ListItemData";
import Api from "../../../../controllers/EducationalBackgroundController";

export function EducationalBackgroundScreen() {
  // Dentro do componente da tela
  const navigation = useNavigation();
  const navigationState = navigation.getState(); // Obter o estado da navegação

  // Nome da tela que você quer verificar
  const screenNameToCheck = "EducationalBackgroundScreen";

  // Filtrar o histórico de navegação para encontrar instâncias da mesma tela
  const instancesOfScreen = navigationState.routes.filter(
    (route) => route.name === screenNameToCheck
  );

  console.log(
    `Número de instâncias de ${screenNameToCheck}:`,
    instancesOfScreen.length
  );
  const isFocused = useIsFocused();

  const [educationalList, setEducationalList] = useState([]);

  async function loadEducationalFromStorage() {
    try {
      const data = await Api.getEducational();
      setEducationalList(data);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadEducationalFromStorage();
  }, [isFocused]);

  const handleSubmitAdd = () => {
    navigation.navigate("EducationalBackgroundScreenAdd");
  };

  function renderItemList({ item }) {
    const handleSubmitItem = () => {
      navigation.navigate("EducationalBackgroundScreenAdd", {
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
      <Header title={"Formação Educacional"} screenReplace={"ResumeScreen"} />
      <View style={styles.bodyContainer}>
        <FlatList
          data={educationalList}
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
