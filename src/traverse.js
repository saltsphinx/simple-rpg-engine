import parser from "./core/parser.js";

export default function traverse(obj, query, val, isCreate = false) {
  const nestedKeys = parser(query, ".").full;
  const key = nestedKeys.pop();
  let current = obj;

  nestedKeys.forEach((nestedKey) => {
    if (current[nestedKey] === undefined) {
      if (!isCreate)
        throw new Error(
          "nested object by that key not found. nested key: " + nestedKey,
        );

      current[nestedKey] = {};
    }

    current = current[nestedKey];
  });

  if (current[key] === undefined && val === undefined)
    throw new Error("field by that value not found. field key: " + key);
  if (val) current[key] = val;

  return current[key];
}
