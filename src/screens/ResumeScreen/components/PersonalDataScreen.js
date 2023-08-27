import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/Colors";
import Header from "../../../components/Header";
import CustomInput from "../../../components/CustomInput";
import DateInput from "../../../components/DateInput";
import Footer from "../../../components/Footer";
import Api from "../../../controllers/PersonalDataController";
import Validator from "../../../services/Validator";
import { ActivityIndicator } from "react-native";

export function PersonalDataScreen() {
  const navigation = useNavigation();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [phone, setPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidPhoneSec, setIsValidPhoneSec] = useState(true);
  const [phoneSecundary, setPhoneSecundary] = useState("");

  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (name !== "" && phone !== "" && city !== "") {
      try {
        const createSucess = await Api.createPersonalData({
          name,
          email,
          phone,
          phoneSecundary,
          birthDate,
          city,
        });

        if (createSucess) {
          navigation.goBack("ResumeScreen");
        } else {
          console.log("Erro:", createSucess);
        }
      } catch (error) {
        console.error("Error saving personal data to AsyncStorage:", error);
      }
    } else {
      setErrorMessage("Preencha todos os campos");
    }
  };

  const handleSubmitCancel = () => {
    navigation.goBack("ResumeScreen");
  };

  const validationEmail = () => {
    if (email.trim() === "") {
      setIsValidEmail(true);
      return;
    }

    const validatorEmail = Validator.isEmail(email);

    if (validatorEmail) {
      setIsValidEmail(true);
      return;
    } else {
      setIsValidEmail(false);
      return;
    }
  };
  const validationPhone = () => {
    if (phone.trim() === "") {
      setIsValidPhone(true);
      return;
    }

    const validatorPhone = Validator.isPhone(phone);

    if (validatorPhone) {
      setIsValidPhone(true);
      return;
    } else {
      setIsValidPhone(false);
      return;
    }
  };

  const validationPhoneSec = () => {
    if (phoneSecundary.trim() === "") {
      setIsValidPhoneSec(true);
      return;
    }

    const validatorPhone = Validator.isPhone(phoneSecundary);

    if (validatorPhone) {
      setIsValidPhoneSec(true);
      return;
    } else {
      setIsValidPhoneSec(false);
      return;
    }
  };

  async function loadPersonalDataFromStorage() {
    try {
      const data = await Api.getPersonalData();

      if (data.name) {
        setName(data.name);
      }
      if (data.email) {
        setEmail(data.email);
      }
      if (data.phone) {
        setPhone(data.phone);
      }
      if (data.phoneSecundary) {
        setPhoneSecundary(data.phoneSecundary);
      }
      if (data.city) {
        setCity(data.city);
      }
      if (data.birthDate) {
        setBirthDate(new Date(data.birthDate));
      }
      setDataLoaded(true);
      return;
    } catch (error) {
      console.log(error);
      setDataLoaded(true);
      return;
    }
  }
  useEffect(() => {
    loadPersonalDataFromStorage();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Dados Pessoas"}
        screenReplace={"ResumeScreen"}
        goBackScreen={true}
      />
      <ScrollView style={styles.scroww}>
        {dataLoaded ? (
          <View style={styles.inputContainer}>
            <CustomInput
              value={name}
              onChangeText={setName}
              placeholder={"Seu nome"}
            />
            {!isValidEmail && (
              <Text style={styles.errorMessage}>E-mail inválido</Text>
            )}
            <CustomInput
              value={email}
              onChangeText={setEmail}
              placeholder={"seuemail@email.com"}
              onBlur={validationEmail}
            />
            {!isValidPhone && (
              <Text style={styles.errorMessage}>Telefone inválido</Text>
            )}
            <CustomInput
              value={phone}
              onChangeText={setPhone}
              placeholder={"(XX) X XXXX-XXXX"}
              onBlur={validationPhone}
              typeNumber={true}
            />
            {!isValidPhoneSec && (
              <Text style={styles.errorMessage}>
                Telefone secundário inválido
              </Text>
            )}
            <CustomInput
              value={phoneSecundary}
              onChangeText={setPhoneSecundary}
              placeholder={"(XX) X XXXX-XXXX"}
              onBlur={validationPhoneSec}
              typeNumber={true}
            />
            <CustomInput
              value={city}
              onChangeText={setCity}
              placeholder={"Cidade atual. Ex: Fortaleza-CE"}
            />
            <DateInput
              value={birthDate}
              isOptional={true}
              onChangeDate={setBirthDate}
              label={"Data de nascimento (opcional)"}
            />
          </View>
        ) : (
          <ActivityIndicator
            style={styles.iconLoading}
            size="large"
            color={Colors.slateGray}
          />
        )}
      </ScrollView>
      <View style={styles.footer}>
        <Footer onPressSave={handleSubmit} onPressCancel={handleSubmitCancel} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
  scroww: { flex: 1, width: "100%", paddingHorizontal: 30 },

  inputContainer: {
    paddingVertical: 10,
    justifyContent: "center",
    gap: 16,
  },
  footer: {
    marginTop: 20,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  errorMessage: {
    marginBottom: -5,
    fontSize: 12,
    color: "#ff3f56",
    fontWeight: "bold",
    paddingLeft: 15,
  },
  iconLoading: { margin: 10, paddingTop: 40 },
});
