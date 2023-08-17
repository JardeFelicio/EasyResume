import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors } from "../utils/Colors";
import { format } from "date-fns";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default function DateInput({ label, value, onChangeDate, isOptional }) {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(
    isOptional && !value ? false : true
  );
  const [showPicker, setShowPicker] = useState(false);
  const toggleSwitch = () => {
    if (isEnabled) {
      onChangeDate("");
    } else {
      onChangeDate(new Date());
    }
    setIsEnabled(!isEnabled);
  };

  const handleDateChange = (event, date) => {
    setShowPicker(false);
    if (Platform.OS === "ios") {
      setDatePickerVisible(false);
      onChangeDate(event);
    } else {
      if (date != undefined) {
        onChangeDate(date);
      }
    }
  };
  const hideDatePicker = () => {
    setShowPicker(false);
    if (Platform.OS === "ios") {
      setDatePickerVisible(false);
    }
  };
  const openDatePicker = () => {
    setShowPicker(true);

    if (Platform.OS === "ios") {
      setDatePickerVisible(true);
    }
  };
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={Colors.slateGray} />;
  } else {
    return (
      <View>
        <View style={styles.headerArea}>
          <Text style={styles.text}>{label}</Text>
          {isOptional ? (
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: Colors.deepPurple }}
              thumbColor={isEnabled ? Colors.paleGray : Colors.lightGray}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          ) : (
            <></>
          )}
        </View>
        <TouchableOpacity
          disabled={!isEnabled}
          style={styles.container}
          onPress={openDatePicker}
        >
          <View
            style={isEnabled ? styles.inputGroup : styles.inputGroupDisabled}
          >
            <Text style={styles.input}>
              {value ? format(value, "dd/MM/yyyy") : ""}
            </Text>

            {showPicker && Platform.OS === "android" && (
              <DateTimePicker
                value={value}
                mode="date"
                display={"default"}
                onChange={handleDateChange}
                style={styles.datePicker}
              />
            )}
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateChange}
          onCancel={hideDatePicker}
          isDarkModeEnabled={true}
          textStyle={{ color: "blue" }} // Altera a cor do texto da data
          pickerStyle={{ backgroundColor: "white" }} // Altera a cor de fundo da modal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerArea: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  switch: { marginRight: 8 },
  container: {},
  inputGroup: {
    backgroundColor: Colors.lightGray,
    flexDirection: "row",
    paddingHorizontal: 27,
    width: "100%",
    height: 65,
    borderColor: Colors.slateGray,
    borderRadius: 20,
    alignItems: "center",
  },

  inputGroupDisabled: {
    backgroundColor: Colors.lightBorderGray,
    flexDirection: "row",
    paddingHorizontal: 27,
    width: "100%",
    height: 65,
    borderColor: Colors.slateGray,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    alignItems: "center",
    width: "97%",
    fontSize: 18,
    color: Colors.slateGray,
  },
  datePicker: {
    width: 320,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerIOS: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    color: "black",
  },
  modal: {
    color: "black",
  },
});
