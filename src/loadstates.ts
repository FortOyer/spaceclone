import { State } from 'phaser';
import { rooms } from '../build/gen/rooms';
import { Room } from './adventure';

export class BootState extends State {

    constructor() {
        super();
    }

    preload() : void {
        this.load.image('preload', 'images/preloader.png');
    }

    create() : void {
         this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //have the game centered horizontally
        this.state.start('Preload');
    }
}

export class PreloadState extends State {

    constructor() {
        super();
    }

    preload() : void {
        let splash = this.add.sprite(this.game.world.centerX,
                                     this.game.world.centerY, 'preload');
        this.load.bitmapFont('font', 'font/font.png', 'font/font.fnt');
        this.load.image('room', 'images/room.png');
        this.loadRooms();
    }

    create() : void {
        this.state.start('roomA');
    }

    loadRooms() : void {
        for (let room of rooms)
        {
            this.load.tilemap(room.properties.roomName, null, room,
                              Phaser.Tilemap.TILED_JSON);
            new Room(this.game, room.properties.roomName);
        }
    }
}
