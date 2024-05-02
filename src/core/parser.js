export default function parser(input) {
  if (!(typeof input == "string"))
    throw new Error("Parser requires string as first paramenter");
  const origin = input.trim().replace(/\s{2,}/, " ");
  const parts = origin.split(" ");
  const head = parts.shift();
  const tail = parts.join(" ");

  return {
    parts,
    head,
    tail,
    origin,
  };
}
