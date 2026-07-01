import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { readFileSync } from "fs";

const data = new Uint8Array(readFileSync("C:/Users/dias_n1/Downloads/Telegram Desktop/MS-Mavzulashtirilgan 1-savollar.pdf"));
const pdf = await getDocument({ data }).promise;
console.log("Sahifalar:", pdf.numPages);
for (let i = 1; i <= Math.min(3, pdf.numPages); i++) {
  const page = await pdf.getPage(i);
  const content = await page.getTextContent();
  const text = content.items.map(item => item.str).join(" ");
  console.log(`\n=== ${i}-sahifa ===\n${text.slice(0, 2000)}`);
}
