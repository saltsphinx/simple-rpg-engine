import fs from "node:fs";

const version = JSON.parse(
  fs.readFileSync(process.cwd() + "/package.json"),
).version;

const templates = JSON.parse(
  fs.readFileSync(process.cwd() + "/src/core/manager-templates.json"),
);

export default function manager(template = templates.initial) {
  const returnObj = template;

  const get = (query) => {
    return /\./.test(query)
      ? retriveNested(returnObj, query)?.value
      : returnObj[query];
  };

  const set = (query, value) => {
    if (/\./.test(query)) {
      const { obj, field } = retriveNested(returnObj, query);
      if (!obj) return false;

      obj[field] = value;
    }

    returnObj[query] = value;
    return true;
  };

  return Object.assign(returnObj, {
    get,
    set,
  });
}

function retriveNested(obj, query) {
  let curObj = obj;
  const fields = query.split(".");

  for (let i = 0; i < fields.length - 1; i++) {
    if (typeof curObj[fields[i]] == "object") curObj = curObj[fields[i]];
    else return;
  }

  return {
    obj: curObj,
    field: fields[fields.length - 1],
    value: curObj[fields[fields.length - 1]],
  };
}
