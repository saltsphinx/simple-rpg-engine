import parser from "./parser.js";
import parserObjectInterface from "./parserObjectInterface.js";

export default function terminal(input, data, commandList) {
  if (!(typeof data === "object"))
    throw new Error("Object not passed for data");
  if (!(typeof commandList === "object"))
    throw new Error("Object not passed for commandList");

  let parserObj;
  switch (typeof input) {
    case "string":
      parserObj = parser(input);
      break;
    default:
      parserObjectInterface(input);
      parserObj = input;
      break;
  }

  const command = commandList[parserObj.head];
  if (command) {
    command(parserObj, data, terminal, commandList);
    return true;
  }

  return false;
}
