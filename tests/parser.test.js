import parser from "../src/parser";

test("Returns object with parsed command parts", () => {
  const command = "l inside chest";
  const expectedObj = {
    command: "l",
    origin: command,
    tail: "inside chest",
    args: ["inside", "chest"],
  };

  expect(parser(command)).toEqual(expectedObj);
});

test("Returns parsed command when padding is added on sides", () => {
  const command = "   buy apple from keeper   ";
  const expectedObj = {
    command: "buy",
    origin: "buy apple from keeper",
    tail: "apple from keeper",
    args: ["apple", "from", "keeper"],
  };

  expect(parser(command)).toEqual(expectedObj);
});

test("Returns parsed command when padding is between arguments", () => {
  const command = "open   north";
  const expectedObj = {
    command: "open",
    origin: "open north",
    tail: "north",
    args: ["north"],
  };

  expect(parser(command)).toEqual(expectedObj);
});

test("Returns object with empty strings when command is empty and no arguments", () => {
  const command = "";
  const expectedObj = {
    command: "",
    origin: "",
    tail: "",
    args: [],
  };

  expect(parser(command)).toEqual(expectedObj);
});
