import terminal from "./core/terminal.js";
import ps from "prompt-sync";

const prompt = ps();
const data = {
  playing: true,
};

function lookCommand(parserObj) {
  if (parserObj.args.length == 0)
    return console.log("You take in your surroundings.");
  const thing = parserObj.args[0];

  console.log("You look at the " + thing);
}

function quitCommand(parserObj, data) {
  console.log("Are you sure you want to quit?\ny\\n");
  if (/y/i.test(prompt())) data.playing = false;
}

function commandsCommand(parserObj) {
  Object.keys(commandList).forEach((val, i) => console.log(i + ". " + val));
}

const commandList = {
  l: lookCommand,
  quit: quitCommand,
  commands: commandsCommand,
};

function game() {
  console.clear();
  console.log(
    "You spawn into the world. Use the prompt to interact with the world.",
  );

  while (data.playing) {
    console.log("\n");
    terminal(prompt(""), data, commandList);
  }

  console.log("See you soon!");
}

game();
