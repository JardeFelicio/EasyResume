import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Colors } from "../../../../utils/Colors";
import Header from "../../../../components/Header";
import AddButton from "../../../../components/AddButton";
import ListItemData from "../../../../components/ListItemData";
import Api from "../../../../controllers/AdditionalInformationController";

export function AdditionalInformationScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [additionalList, setAdditionalList] = useState([]);

  async function loadAdditionalFromStorage() {
    try {
      const data = await Api.getAdditional();
      setAdditionalList(data);
      console.log(additionalList);

      return;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadAdditionalFromStorage();
  }, [isFocused]);
  const handleSubmitAdd = () => {
    navigation.navigate("AdditionalInformationScreenAdd");
  };

  function renderItemList({ item }) {
    console.log(item);
    const handleSubmitItem = () => {
      navigation.navigate("AdditionalInformationScreenAdd", {
        selectedItem: item,
      });
    };
    return (
      <ListItemData
        textItem={item.information.substring(0, 25) + "..."}
        //infoItem={item.description.substring(0, 25) + "..."}
        onPress={handleSubmitItem}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Informações Adicionais"} screenReplace={"ResumeScreen"} />
      <View style={styles.bodyContainer}>
        <FlatList
          data={additionalList}
          renderItem={renderItemList}
          keyExtractor={(item) => item.information}
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
