import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_800ExtraBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../config/Colors";

const MENU_ITEMS = [
  {
    text: "Dados Pessoais",
    icon: "account",
    info: "Forneça informações de contato e endereço",
  },
  {
    text: "Objetivo Profissional",
    icon: "target",
    info: "Indique a área que deseja atuar",
  },
  {
    text: "Resumo de Qualificações",
    icon: "file-document-outline",
    info: "Destaque suas competências e diferenciais relevantes",
  },
  {
    text: "Formação Educacional",
    icon: "school",
    info: "Informe seu grau de formação acadêmica",
  },
  {
    text: "Experiência Profissional",
    icon: "briefcase",
    info: "Relate suas experiências de trabalho",
  },
  {
    text: "Cursos",
    icon: "book-open-variant",
    info: "Adicione os cursos que você realizou",
  },
  {
    text: "Qualificações Profissionais",
    icon: "certificate",
    info: "Acrescente suas certificações e qualificações",
  },
  {
    text: "Idiomas",
    icon: "earth",
    info: "Adicione os idiomas que possui conhecimento",
  },
  {
    text: "Informações Adicionais",
    icon: "information",
    info: "Destaque outras atividades relevantes",
  },
];

const ListItemOption = ({ textItem, iconItem, infoItem }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (textItem === "Idiomas") {
      navigation.navigate("LanguagesScreen");
    } else if (textItem === "Cursos") {
      navigation.navigate("CousesScreen");
    }
  };

  return (
    <TouchableOpacity style={styles.listItemContainer} onPress={handlePress}>
      <View style={styles.leftAreaItem}>
        <View style={styles.headerAreaItem}>
          <Icon name={iconItem} size={20} color={"#000"} />
          <Text style={styles.textItemList}>{textItem}</Text>
        </View>
        <View>
          <Text style={styles.descTextItem}>{infoItem}</Text>
        </View>
      </View>
      <Icon
        style={styles.iconArrow}
        name={"chevron-right"}
        size={22}
        color={"#000"}
      />
    </TouchableOpacity>
  );
};

export function ResumeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color="#757575" />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Meu Currículo</Text>
          <TouchableOpacity
            style={styles.iconAreaHeader}
            onPress={() => navigation.replace("HomeScreen")}
          >
            <Icon name={"close"} size={22} color={Colors.secondaryColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            data={MENU_ITEMS}
            renderItem={({ item }) => (
              <ListItemOption
                textItem={item.text}
                iconItem={item.icon}
                infoItem={item.info}
              />
            )}
            keyExtractor={(item) => item.text}
            contentContainerStyle={styles.flatListBody}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  headerContainer: {
    marginTop: 60,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: "Montserrat_800ExtraBold",
  },
  iconAreaHeader: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "90%",
    marginTop: "5%",
    marginBottom: "5%",
    flex: 1,
  },
  listItemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.secondaryColor,
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
  },
  leftAreaItem: {
    flexDirection: "column",
    width: "95%",
  },
  headerAreaItem: {
    width: "80%",
    flexDirection: "row",
    margin: "1%",
    marginBottom: 0,
  },
  textItemList: {
    paddingLeft: 8,
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    marginBottom: "1%",
  },
  descTextItem: {
    margin: "1%",
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
  },
  iconArrow: {},
  flatListBody: {
    flexGrow: 1,
  },
});
