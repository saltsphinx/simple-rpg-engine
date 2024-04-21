Create a lightweight RPG library with MUD mechanics. Simple node based room system. Simple command/terminal system. Simple room and object interaction system.

Terminal will be a simple function that parses string input into two parts(if possible), takes the first part and checks against a list of commands, then calls a command if one is found.

Commands are simple functions that accept string input as the first parameter and the terminal function as its second one in cases of chain commands.

It might be a good idea to pass references of both the command list and state to the terminal and command functions.

first part is the parser. For the terminal, it will split the first word from the rest of the string if possible. For commands, theyll need indiviual words(so for the string to be split into an array). its probably a good idea to have the parser return an object

parser("l table") => { command: "l", origin: "l table", tail: "table", args: ["table"]}
command is the first word, origin is the original string, tail is the remainder of string after first word is removed, args us the tail split by spaces