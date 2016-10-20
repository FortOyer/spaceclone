import { Engine } from './adventure';
import Phaser = require('phaser');
import AdventureEngine = require('./adventure');

import { BootState, PreloadState } from './loadstates';
import { MainMenuState } from './menustates';

export function execute() : void
{
    let engine = new Phaser.Game(512, 256, Phaser.AUTO, 'content', null,
        false, false);
    
    engine.state.add('Boot', new BootState());
    engine.state.add('Preload', new PreloadState());
    engine.state.add('MainMenu', new MainMenuState());
    engine.state.start('Boot');
}