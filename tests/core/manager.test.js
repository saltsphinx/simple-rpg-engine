import manager from "../../src/core/manager.js";

describe("get function", () => {
  test("It returns value of provided field", () => {
    const instance = manager();

    instance.test = "test";

    expect(instance.get("test")).toBe("test");
  });

  test("It returns value of nested field", () => {
    const instance = manager();
    const value = "Foralwil";

    instance.world = { name: value };

    expect(instance.get("world.name")).toBe(value);
  });
});

describe("set function", () => {
  test("It sets provided field to provided value", () => {
    const instance = manager();
    const field = "test";
    const value = "test";

    instance.set(field, value);

    expect(instance).toHaveProperty(field, value);
  });

  test("It sets provided nested field to provided value", () => {
    const instance = manager();
    const field = "nest.test";
    const value = "test";

    instance.nest = {};
    instance.set(field, value);

    expect(instance).toHaveProperty(field, value);
  });
});

describe("room loading functions", () => {
  const template = {
    world: {
      rooms: {
        testRoom01: {
          title: "testing room - 1",
          travelTable: {
            north: { id: "testRoom02" },
          },
        },
        testRoom02: {
          title: "testing room - 2",
        },
      },
    },
  };

  test("It loads and sets up rooms in data", () => {
    const instance = manager(template);

    manager.load("testRoom01");
  });
});
