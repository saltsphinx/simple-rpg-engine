Manager: The main object developers use to create the game world, contains state and allows for other operations like serialization and loading of game saves

manager.
  set(managerObject | field, value[optional if field is first param])
    accepts an object whose fields represent settings, initial world state, ect.
    indiviual fields(strings) can be set, and a second param is expected
    example:
      manager.set({
        data: {
          player: { level: 1, name: "Bondrewd", location: "dankCave" }
        },
        world: {
          name: "Annafond",
          rooms: {}
        }
      })
    manager.set("world.rooms", {
      dankCave: {
        name: "Dank Cave",
        description: "",
        inventory: {},
        travelTable: {
          out: { id: "forestClearing" }
          north: { id: "dankCave2", status: { passable: false, is: "blocked off by cave in" } }
        }
      }
    })

the rooms are clearly defined here, but when loaded, will be represented by a graph with adjacency list of incidents.
room objects in memory:
{
  id: "forestClearing",
  travelTable: {
    in: { rooms: new Set(this, { id: "dankCave"... }) }
  }
}
 