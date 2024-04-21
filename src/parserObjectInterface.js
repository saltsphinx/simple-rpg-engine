const keys = ["args", "tail", "command", "origin"];

export default function parserObjectInterface(obj) {
  if (!(typeof obj === "object")) throw new Error("Object not passed");
  keys.forEach((key) => {
    if (obj[key] == undefined)
      throw new Error("Object doesn't match parser object interface");
  });

  return true;
}
