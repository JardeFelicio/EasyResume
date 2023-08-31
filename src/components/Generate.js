import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../utils/Colors";
import { generateResumePDF } from "../services/CurriculumGenerator";
import Api from "../controllers/GeneratePDFController";

export default function Generate() {
  const handlePress = async () => {
    const dataEssential = await Api.hasEssentialData();
    if (dataEssential) {
      const data = await Api.getAll();
      const pdfGenerated = await generateResumePDF(data);
      if (pdfGenerated) {
        console.log("PDF generated successfully.");
      } else {
        console.log("Error generating PDF.");
      }
    } else {
      console.log("Dados pendentes");
    }
  };
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>Gerar Curriculo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 15,
  },

  button: {
    backgroundColor: Colors.deepPurple,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 65,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  text: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    borderLeftColor: Colors.white,
    width: "55%",
    textAlign: "center",
  },
});
