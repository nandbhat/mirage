const formattedReturn = require("./helpers/formattedReturn");
const login = require("./helpers/login");

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    return await login(event);
  }
  return formattedReturn(405, {});
};
