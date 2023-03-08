async function main() {
  const { GoogleSpreadsheet } = require("google-spreadsheet");

  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet("<the sheet ID from the url>");

  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth(require("./credentials.json"));

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);
  await doc.updateProperties({ title: "renamed doc" });

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  console.log(sheet.title);
  console.log(sheet.rowCount);

  // adding / removing sheets
  const newSheet = await doc.addSheet({ title: "hot new sheet!" });
  await newSheet.delete();
}

main();
