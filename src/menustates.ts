import { State } from 'phaser';

export class MainMenuState extends State {
    
    constructor() {
        super();
    }

    create() : void {
        let playText = this.add.bitmapText(this.game.width/2,
                                           this.game.height/2,
                                           'font', 'Play');
    }
}