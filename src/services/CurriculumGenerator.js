import PDFLib, { PDFDocument, PDFText, PDFLine } from "react-native-pdf-lib";
import { AsyncStorage } from "react-native";
import RNFS from "react-native-fs";

const generatePDF = async () => {
  try {
    const data = await AsyncStorage.getItem("curriculumData");
    const curriculumData = JSON.parse(data);

    const pdfPath = `${RNFS.DocumentDirectoryPath}/curriculum.pdf`;
    const pdfDoc = PDFDocument.create();

    const page = pdfDoc.addPage([595.276, 841.89]);
    const pageWidth = page.getWidth();

    // Obter a fonte uma vez
    const font = await PDFDocument.getFontForFile("path/to/your/font.ttf");

    // Título
    const titleText = new PDFText(page, "Currículo", {
      x: 0,
      y: page.getHeight() - 50,
      size: 20,
      color: "#000000",
      font,
      align: "center",
      underline: true,
    });
    page.drawText(titleText);

    // Seção de Dados Pessoais
    const sectionTitle = new PDFText(page, "Dados Pessoais", {
      x: 50,
      y: page.getHeight() - 100,
      size: 16,
      color: "#000000",
      font,
      underline: true,
    });
    page.drawText(sectionTitle);

    // Adicionar os detalhes da seção
    const detailsY = page.getHeight() - 130;
    const lineHeight = 16;
    const details = [
      "Idade: " + curriculumData.age,
      "Cidade: " + curriculumData.city,
      "Telefone Principal: " + curriculumData.primaryPhone,
      "Telefone Secundário: " + curriculumData.secondaryPhone,
      "LinkedIn: " + curriculumData.linkedin,
      "CNH: " + curriculumData.cnh,
    ];

    for (const detail of details) {
      const detailText = new PDFText(page, detail, {
        x: 70,
        y: detailsY,
        size: 12,
        color: "#000000",
        font,
      });
      page.drawText(detailText);
      detailsY -= lineHeight;
    }

    // Adicionar mais seções de maneira semelhante

    const pdfBytes = await pdfDoc.save();
    await RNFS.writeFile(pdfPath, pdfBytes, "base64");
    console.log("PDF criado com sucesso:", pdfPath);
  } catch (error) {
    console.error("Erro ao criar o PDF:", error);
  }
};

// Chame a função para gerar o PDF
generatePDF();
