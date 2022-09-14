import path from "path";
// @ts-ignore
import pdfMake from "pdfmake/src/printer";
import getPDFData from "./helpers/get-word-array";
import fs from "fs";

class pdfService {
  public async createPDF(urlList: string[]) {
    const PDFData = await getPDFData(urlList);
    const tableBody = [["URL", "Слово1", "Слово2", "Слово3"]];
    PDFData.forEach((e) => {
      tableBody.push([e.url, ...e.words]);
    });

    const fonts = {
      Roboto: {
        normal: path.join(
          __dirname,
          "..",
          "..",
          "assets",
          "fonts",
          "Roboto-Regular.ttf"
        ),
        bold: path.join(
          __dirname,
          "..",
          "..",
          "assets",
          "fonts",
          "Roboto-Medium.ttf"
        ),
        italics: path.join(
          __dirname,
          "..",
          "..",
          "assets",
          "fonts",
          "Roboto-Italic.ttf"
        ),
        bolditalics: path.join(
          __dirname,
          "..",
          "..",
          "assets",
          "fonts",
          "Roboto-MediumItalic.ttf"
        ),
      },
    };

    const pdfData = {
      content: [
        { text: "Задание 1", style: "header" },
        { text: "3 самых часто исползуемых слова длиной больше 4 букв" },
        {
          style: "tableExample",
          table: {
            body: tableBody,
          },
        },
      ],
    };
    const printer: any = new pdfMake(fonts);
    const pdfDoc = printer.createPdfKitDocument(pdfData);
    const pdfDocPath = path.join(__dirname, "..", "..", "public", "report.pdf");
    if (fs.existsSync(pdfDocPath)) fs.unlinkSync(pdfDocPath);
    await new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(pdfDocPath);
      pdfDoc.pipe(stream);
      pdfDoc.end();
      stream.on("finish", () => resolve(true));
    });

    return pdfDocPath;
  }
}

export default new pdfService();
