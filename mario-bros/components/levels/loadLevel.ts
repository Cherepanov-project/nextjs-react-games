import { createBackgroundLayer, createSpriteLayer } from '../Layers';

import firstLvl from './1-1.json';
import { loadBackgroundSprites } from '../spriteSheets/LoadSprites';
import Level from '../Level';

export default function loadImage(url: any) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      setTimeout(resolve, 1000, image);
    });
    image.src = url.src;
  });
}

function createTiles(level, backgorunds) {
  backgorunds.forEach(backgorund => {
    backgorund.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          level.tiles.set(x, y, {
            name: backgorund.tile,
          });
        }
      }
    });
  });
}

export function loadLevel() {
  return Promise.all([firstLvl, loadBackgroundSprites()]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();
    createTiles(level, levelSpec.backgrounds);
    const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites);
    level.comp.layers.push(backgroundLayer);
    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);
    console.log(level);
    return level;
  });
}
