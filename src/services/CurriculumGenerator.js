import ModelOne from "./models/ModelOne";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system"; // Importe expo-file-system
import { shareAsync } from "expo-sharing";

export async function generateResumePDF(data) {
  const htmlContent = ModelOne(data);

  try {
    //   const { uri } = await Print.printToFileAsync({ html: htmlContent });

    //   // Define o novo caminho onde o arquivo será movido
    //   const newFilePath = `${FileSystem.documentDirectory}meu_curriculo.pdf`;

    //   // Move o arquivo para o novo caminho
    //   await FileSystem.moveAsync({
    //     from: uri,
    //     to: newFilePath,
    //   });

    //   console.log("File has been moved to:", newFilePath);

    //   // Compartilha o PDF
    //   await shareAsync(newFilePath, {
    //     UTI: "com.adobe.pdf",
    //     mimeType: "application/pdf",
    //   });

    //   return newFilePath;

    return;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
}
