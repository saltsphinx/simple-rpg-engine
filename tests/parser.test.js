import parser from "../src/parser";

test("Returns object with parsed command parts", () => {
  const input = "l inside chest";
  const expectedObj = {
    command: "l",
    origin: input,
    tail: "inside chest",
    args: ["inside", "chest"],
  };

  expect(parser(input)).toEqual(expectedObj);
});

test("Returns parsed command when padding is added on sides", () => {
  const input = "   buy apple from keeper   ";
  const expectedObj = {
    command: "buy",
    origin: "buy apple from keeper",
    tail: "apple from keeper",
    args: ["apple", "from", "keeper"],
  };

  expect(parser(input)).toEqual(expectedObj);
});

test("Returns parsed command when padding is between arguments", () => {
  const input = "open   north";
  const expectedObj = {
    command: "open",
    origin: "open north",
    tail: "north",
    args: ["north"],
  };

  expect(parser(input)).toEqual(expectedObj);
});

test("Returns object with empty strings when command is empty and no arguments", () => {
  const input = "";
  const expectedObj = {
    command: "",
    origin: "",
    tail: "",
    args: [],
  };

  expect(parser(input)).toEqual(expectedObj);
});
