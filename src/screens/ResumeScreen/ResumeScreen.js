import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
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
import { Colors } from "../../utils/Colors";
import { MENU_ITEMS } from "../../utils/MenuItems";
import Header from "../../components/Header";
import Generate from "../../components/Generate";

const ListItemOption = ({ textItem, iconItem, infoItem }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (textItem === "Idiomas") {
      navigation.navigate("LanguagesScreen");
    } else if (textItem === "Cursos") {
      navigation.navigate("CoursesScreen");
    } else if (textItem === "Dados Pessoais") {
      navigation.navigate("PersonalDataScreen");
    } else if (textItem === "Objetivo Profissional") {
      navigation.navigate("ProfessionalObjectiveScreen");
    } else if (textItem === "Resumo de Qualificações") {
      navigation.navigate("QualificationsSummaryScreen");
    } else if (textItem === "Formação Educacional") {
      navigation.navigate("EducationalBackgroundScreen");
    } else if (textItem === "Experiência Profissional") {
      navigation.navigate("ProfessionalExperienceScreen");
    } else if (textItem === "Qualificações Profissionais") {
      navigation.navigate("ProfessionalQualificationsScreen");
    } else if (textItem === "Informações Adicionais") {
      navigation.navigate("AdditionalInformationScreen");
    }
  };

  return (
    <TouchableOpacity style={styles.listItemContainer} onPress={handlePress}>
      <View style={styles.leftAreaItem}>
        <View style={styles.headerAreaItem}>
          <Icon name={iconItem} size={20} color={Colors.black} />
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
        color={Colors.black}
      />
    </TouchableOpacity>
  );
};

function renderItemList({ item }) {
  return (
    <ListItemOption
      textItem={item.text}
      iconItem={item.icon}
      infoItem={item.info}
    />
  );
}
export function ResumeScreen() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={Colors.slateGray} />
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Header title={"Meu Currículo"} screenReplace={"HomeScreen"} />
        </View>

        <View style={styles.bodyContainer}>
          <FlatList
            data={MENU_ITEMS}
            renderItem={renderItemList}
            keyExtractor={(item) => item.text}
            contentContainerStyle={styles.flatListBody}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Generate />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    height: 100,
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
    backgroundColor: Colors.lightGray,
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
  },
  leftAreaItem: {
    flexDirection: "column",
    width: "95%",
  },
  headerAreaItem: {
    width: "85%",
    flexDirection: "row",
    margin: "1%",
    marginBottom: 0,
  },
  textItemList: {
    paddingLeft: 8,
    fontFamily: "Montserrat_700Bold",
    fontSize: 15,
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
