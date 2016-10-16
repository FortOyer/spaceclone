import Phaser = require('phaser');

export class Engine {
    constructor(width: number = 800, height: number = 450) {
    this.game = new Phaser.Game(width, height, Phaser.AUTO, 'content',
                                { preload: this.preload, create: this.create });
    }
    
    preload() : void {
        this.game.load.image('logo', 'images/phaser.png');
    }

    create() : void {
        var logo = this.game.add.sprite(this.game.world.centerX,
                                        this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.5, 0.5);
    }
    
    game: Phaser.Game;
}