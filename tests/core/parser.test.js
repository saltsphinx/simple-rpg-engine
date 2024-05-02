import parser from "../../src/core/parser.js";

test("Returns object with parsed head parts", () => {
  const input = "l inside chest";
  const expectedObj = {
    head: "l",
    origin: input,
    tail: "inside chest",
    parts: ["inside", "chest"],
  };

  expect(parser(input)).toEqual(expectedObj);
});

test("Returns parsed head when padding is added on sides", () => {
  const input = "   buy apple from keeper   ";
  const expectedObj = {
    head: "buy",
    origin: "buy apple from keeper",
    tail: "apple from keeper",
    parts: ["apple", "from", "keeper"],
  };

  expect(parser(input)).toEqual(expectedObj);
});

test("Returns parsed head when padding is between arguments", () => {
  const input = "open   north";
  const expectedObj = {
    head: "open",
    origin: "open north",
    tail: "north",
    parts: ["north"],
  };

  expect(parser(input)).toEqual(expectedObj);
});

test("Returns object with empty strings when head is empty and no arguments", () => {
  const input = "";
  const expectedObj = {
    head: "",
    origin: "",
    tail: "",
    parts: [],
  };

  expect(parser(input)).toEqual(expectedObj);
});
