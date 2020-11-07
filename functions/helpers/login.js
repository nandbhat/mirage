const { table } = require("./airtable");
const formattedReturn = require("./formattedReturn");
module.exports = async (event) => {
  console.log(event);
  try {
    const fields = JSON.parse(event.body);
    const myPassCode = fields.passCode;
    const passCodesAirtable = await table.select().firstPage();
    const authorizedPassCodes = passCodesAirtable
      .map((item) => item.fields)
      .map((row) => row.passCode);
    if (authorizedPassCodes.includes(myPassCode)) {
      return formattedReturn(200, { authorized: true });
    }
    return formattedReturn(401, { msg: "Invalid passcode" });
  } catch (e) {
    console.error(e);
    return formattedReturn(500, { msg: "Something went wrong" });
  }
};
