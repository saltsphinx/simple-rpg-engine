export default function parser(commandStr) {
  if (!(typeof commandStr == "string"))
    throw new Error("Parser requires string as first paramenter");
  const origin = commandStr.trim().replace(/\s{2,}/, " ");
  const args = origin.split(" ");
  const command = args.shift();
  const tail = args.join(" ");

  return {
    args,
    command,
    tail,
    origin,
  };
}
