import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../utils/Colors";

const ListItemMenu = ({ textItem }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (textItem === "Curriculo") {
      navigation.navigate("ResumeScreen");
    } else if (textItem === "Carta de apresentação") {
      navigation.navigate("LetterScreen");
    }
  };
  return (
    <TouchableOpacity style={styles.listItem} onPress={handlePress}>
      <View style={styles.textItemArea}>
        <Text style={styles.textList}>{textItem}</Text>
      </View>
      <Icon
        style={styles.iconArrow}
        name={"chevron-right"}
        size={22}
        color={Colors.paleGray}
      />
    </TouchableOpacity>
  );
};

export function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={Colors.lightGray} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Image
            source={require("../../assets/person.png")}
            style={styles.imgLogo}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textWelcome}>Bem vindo ao Easy Resume</Text>
          <Text style={styles.textQuestion}>O quê você quer criar?</Text>
        </View>
        <View style={styles.listItemContainer}>
          <ListItemMenu textItem={"Curriculo"} />
          <ListItemMenu textItem={"Carta de apresentação"} />
        </View>
        <View></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bluishGray,
    flex: 1,
    alignItems: "center",
  },
  imgLogo: { marginTop: 50, width: 220, height: 220 },
  textContainer: {
    margin: 20,
  },
  textWelcome: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
    color: Colors.deepPurple,
  },
  textQuestion: {
    marginTop: 5,
    fontSize: 25,
    fontFamily: "Montserrat_800ExtraBold",
    textAlign: "center",
    color: Colors.deepPurple,
  },
  listItemContainer: {
    marginTop: 20,

    alignItems: "center",
    justifyContent: "center",
    width: "85%",
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    backgroundColor: Colors.deepPurple,
    borderRadius: 20,
    marginBottom: 10,
  },

  textItemArea: { width: "85%" },
  textList: {
    paddingLeft: 30,
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 16,
    color: Colors.white,
  },
  iconArrow: { width: "10%" },
});
