import Phaser = require('phaser')

export class Room
{

  constructor(public game : Phaser.Game, public roomJson : any) {
      game.state.add(roomJson.properties.roomName, new RoomState(roomJson))
  }

  makeActive(): void {
    this.game.state.start(this.roomJson.properties.roomName);
  }

}

class RoomState extends Phaser.State {

  map : Phaser.Tilemap;

  constructor(public roomJson : any) {
    super();
  }

  create() : void {
    this.map = this.game.add.tilemap(this.key);
    this.map.addTilesetImage("room", "room");

    this.map.createLayer('Tile Layer 1');
  }

}