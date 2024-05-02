import traverse from "../src/traverse.js";

test("it finds single depth value", () => {
  const obj = { test: 1 };

  expect(traverse(obj, "test")).toBe(1);
});

test("it finds multiple depth value", () => {
  const obj = {
    nested: {
      test: 1,
    },
  };

  expect(traverse(obj, "nested.test")).toBe(1);
});

test("it throws an error if value isn't found", () => {
  const obj = {};

  expect(() => traverse(obj, "test")).toThrow();
});

test("it throws an error if nested object isn't found", () => {
  const obj = {};

  expect(() => traverse(obj, "test.test")).toThrow();
});

test("it updates single depth value", () => {
  const obj = {};

  traverse(obj, "test", 1);

  expect(obj.test).toBe(1);
});

test("it updates multiple depth value", () => {
  const obj = { nested: {} };

  traverse(obj, "nested.test", 1);

  expect(obj.nested.test).toBe(1);
});

test("it creates nested object", () => {
  const obj = {};

  traverse(obj, "nested.test", 1, true);

  expect(obj).toHaveProperty("nested");
  expect(obj.nested.test).toBe(1);
});

test("it creates multiple nested object", () => {
  const obj = {};

  traverse(obj, "nested.deeper.test", 1, true);

  expect(obj).toHaveProperty("nested");
  expect(obj.nested).toHaveProperty("deeper");
  expect(obj.nested.deeper.test).toBe(1);
});
