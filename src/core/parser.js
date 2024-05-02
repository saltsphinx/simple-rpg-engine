export default function parser(input, char = " ") {
  if (!(typeof input == "string"))
    throw new Error("Parser requires string as first paramenter");
  const origin = input.trim().replace(/\s{2,}/, " ");
  const full = origin.split(char);
  const parts = [...full];
  const head = parts.shift();
  const tail = parts.join(char);

  return {
    parts,
    head,
    full,
    tail,
    origin,
  };
}
