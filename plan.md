apr 19 2023
Create a lightweight RPG library with MUD mechanics. Simple node based room system. Simple command/terminal system. Simple room and object interaction system.

Terminal will be a simple function that parses string input into two parts(if possible), takes the first part and checks against a list of commands, then calls a command if one is found.

Commands are simple functions that accept string input as the first parameter and the terminal function as its second one in cases of chain commands.

It might be a good idea to pass references of both the command list and state to the terminal and command functions.

first part is the parser. For the terminal, it will split the first word from the rest of the string if possible. For commands, theyll need indiviual words(so for the string to be split into an array). its probably a good idea to have the parser return an object

parser("l table") => { command: "l", origin: "l table", tail: "table", args: ["table"]}
command is the first word, origin is the original string, tail is the remainder of string after first word is removed, args us the tail split by spaces

apr 21 2023
as mentioned before, the terminal will just be a function. it takes a string, parses it, then checks the command string against a list of commands. it then either calls the command and returns true, or returns false. it'll accept both strings and parser objects as parameter 1, an object of commands as parameter 2, and maybe data as parameter 3.

for data, maybe some event driven/observer design would fit best? with commands and other systems having access to a caller object, and pass a string of the events name and data as params? Idk yet

_
next are rooms. how do we save data about rooms to a DB? how do we create a good API for creating rooms that isnt clunky or incoherent? How do we load the data initially? How do we make it so rooms arent taking up a ton of memory?

apr 22 2023
we'll represent rooms with a map(graph). rooms(nodes/vertices) can have multiple neighbors(north, south, east, west, up, down, ect.), and that relationship is undirectional.

i want to come up with a good way of creating a map using code, not a UI tool.

parts of the graph:
the actual room, so informationa bout it
the node which is apart of the room, so it linking to other rooms
its representation, which will be an adjacency list inside of the room objects

im guessing ill have identifiers for saving stuff. the saved information about rooms will be things like npcs or things inside of them, triggered events, ect. they wont have things like neighbors or so on, and on loading of the rooms, save data will be checked to see if they exist, if not then the initial info will be used.

Few things to take into consideration when designing architecture and game features:
How API friendly and intuitive is this feature/system?
Will this feature be serializable?
  How will it be saved?
  How memory intensive is this feature, does it need to be saved along side particular things or not

Rooms:
They will have an inventory(might use the same system for objects and player's inventory)
They'll have a name and description
They'll have a NPC/character list including the player
They'll have triggerable events which I'm not sure how i'll handle
They'll have a list of adjacent rooms

The API:
maybe for actually building the world API wise, it could be as simple as a function accepting an array of objects. Or something similar to express, having *.set() method and similar ones.

So before we create rooms, i probably should design the user-friendly API first.

for loading rooms, i should probably have two functions for doing so. a load() function that loads all info about a room into memory, and a preload() function that is called on a loaded rooms neighbors to load them partially. their id and travel table will be loaded, but only the loaded room(s) will be included in them until visited/loaded themselves.

Rooms are objects that contain an id, title, description, items, npcs, events and exists to neighboring rooms. They can either be loaded, with all of the prior information in them, or preloaded along side loaded rooms where only certain information is loaded, ie. their id, title and neighboring room list, but not the preloaded rooms neighbors. neighbour relationships will be represented by incidents, and stored in adjacency lists(an object with directions).

that isn't true. if one room is loaded and preloads 2 other rooms, then the player travels to one of the rooms that also links to one of the preloaded ones, how would it know that other is preloaded? with this current system, there would either be duplicates, or the program would have to travese potentially all of the loaded rooms. having a travelTabel object with actual references to neighbors isnt necessary. our adjacency/incidence list can be a simple object, where the key is a combination of the two id's, and the value is an object representing the incidence of the two rooms. the incidence being a object can allow for things like locked doors or blocked passages, but also how would that be saved? maybe the has can be saved, and include info like that.

questioning if preload is required now

why do any of the things with graphs when we can just serialize save-worthy changes? im so caught up with wanting to use graphs that ive been ignoring an obvious and simpler solution

what things are save-worthy for rooms:
picking up or dropping of items
triggering of events
state changes of NPC's

save-worth for characters:
location changes
inventory changes
basically anything in the manager.data.player object changing.

the updates to these things should be centralized to a specific function
what would be nice is finding a good way of linking rooms without it being too explicit, ie. having to link rooms in both defintiions of them

terms:
initial room data - the initial data about indivual rooms, inside of manager.world.rooms, and is basically a template
loaded room - object created during runtime thats affected by player and world actions
saved room data - object loaded from serialized data into manager.data.rooms. it is deconstructed along side intial room data to make
loaded room object

- What inputs will your load function have? Will the user enter data or will you get input from somewhere else?
the load function will accept a string which represnts a room id. input comes from a higher level manager function

- What’s the desired output?
return of either initial room data or serialized room data

- Given your inputs, what are the steps necessary to return the desired output?
initialize empty loaded room object
check if room by id exist, if not then throw error. if so, deconstruct into loaded room obj
check if room by id is in save data, if so then deconstruct into loaded room obj