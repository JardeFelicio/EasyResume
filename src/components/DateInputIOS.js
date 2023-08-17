import { useState } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../utils/Colors";
import { format } from "date-fns";
import { useFonts, Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default function DateInputIOS({
  label,
  value,
  onChangeDate,
  isOptional,
}) {
  const [isEnabled, setIsEnabled] = useState(
    isOptional && !value ? false : true
  );

  const toggleSwitch = () => {
    if (isEnabled) {
      onChangeDate("");
    } else {
      onChangeDate(new Date());
    }
    setIsEnabled(!isEnabled);
  };
  const [showPicker, setShowPicker] = useState(false);

  const openDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };

  const handleDateChange = (event, date) => {
    setShowPicker(false);

    if (date !== undefined) {
      // setSelectedDate(date);
      onChangeDate(date);
    }
  };

  return (
    <View>
      <Button title="Show Date Picker" onPress={openDatePicker} />
      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

// export default function DateInput({ label, value, onChangeDate, isOptional }) {

//   const [fontsLoaded] = useFonts({
//     Montserrat_400Regular,
//   });

//   if (!fontsLoaded) {
//     return <ActivityIndicator size={"large"} color={Colors.slateGray} />;
//   } else {
//     return (
//       <View>
//         <View style={styles.headerArea}>
//           <Text style={styles.text}>{label}</Text>
//           {isOptional ? (
//             <Switch
//               style={styles.switch}
//               trackColor={{ false: "#767577", true: Colors.deepPurple }}
//               thumbColor={isEnabled ? Colors.paleGray : Colors.lightGray}
//               ios_backgroundColor="#3e3e3e"
//               onValueChange={toggleSwitch}
//               value={isEnabled}
//             />
//           ) : (
//             <></>
//           )}
//         </View>
//         <TouchableOpacity
//           disabled={!isEnabled}
//           style={styles.container}
//           onPress={openDatePicker}
//         >
//           <View
//             style={isEnabled ? styles.inputGroup : styles.inputGroupDisabled}
//           >
//             <Text style={styles.input}>
//               {value ? format(value, "dd/MM/yyyy") : ""}
//             </Text>

//             {showPicker && (
//               <DateTimePicker
//                 value={value}
//                 mode="date"
//                 display={Platform.OS === "ios" ? "spinner" : "default"}
//                 onChange={handleDateChange}
//                 style={styles.datePicker}
//               />
//             )}
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   headerArea: {
//     justifyContent: "space-between",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   text: {
//     marginBottom: 4,
//     marginLeft: 8,
//     fontSize: 16,
//     fontFamily: "Montserrat_400Regular",
//   },
//   switch: { marginRight: 8 },
//   container: {},
//   inputGroup: {
//     backgroundColor: Colors.lightGray,
//     flexDirection: "row",
//     paddingHorizontal: 27,
//     width: "100%",
//     height: 65,
//     borderColor: Colors.slateGray,
//     borderRadius: 20,
//     alignItems: "center",
//   },

//   inputGroupDisabled: {
//     backgroundColor: Colors.lightBorderGray,
//     flexDirection: "row",
//     paddingHorizontal: 27,
//     width: "100%",
//     height: 65,
//     borderColor: Colors.slateGray,
//     borderRadius: 20,
//     alignItems: "center",
//   },
//   input: {
//     alignItems: "center",
//     width: "97%",
//     fontSize: 18,
//     color: Colors.slateGray,
//   },
//   datePicker: {
//     width: 320,
//     height: 260,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//   },
// });
