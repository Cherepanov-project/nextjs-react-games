/* eslint-disable import/no-duplicates */
import loadImage from '../levels/loadLevel';
import marioImage from '../../assets/imgSprites/mario_and_items.png';
import goombaImage from '../../assets/imgSprites/enemies.png';
import koopaImage from '../../assets/imgSprites/enemies.png';

import SpriteSheets from './SpriteSheets';

export const loadMarioSprites = () =>
  loadImage(marioImage).then((image) => {
    const sprites = new SpriteSheets(image, 16, 18);
    sprites.define('idle', 2, 73, 16, 18);
    return sprites;
  });
// почему-то врагам отрезает ноги
export const loadGoombaSprites = () =>
  loadImage(goombaImage).then((image) => {
    const sprites = new SpriteSheets(image, 18, 19); // 18 19
    sprites.define('walk-1', 0, 15, 19, 24);
    sprites.define('flat', 36, 15, 18, 18);
    return sprites;
  });

export const loadKoopaSprites = () =>
  loadImage(koopaImage).then((image) => {
    const sprites = new SpriteSheets(image, 19, 18);
    sprites.define('walk-1', 54, 12, 18, 50);
    return sprites;
  });
