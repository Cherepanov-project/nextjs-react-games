import Level from '../Level';
import { createBackgroundLayer, createSpriteLayer } from '../Layers';
import { loadBackgroundSprites } from '../spriteSheets/LoadSprites';

import firstLvl from './1-1.json';

export default function loadImage(url: any) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      setTimeout(resolve, 100, image);
    });
    image.src = url.src;
  });
}

function createTiles(level: any, backgrounds: any) {
  function applyRange(background: any, xStart: number, xLen: number, yStart: number, yLen: number) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
        });
      }
    }
  }

  backgrounds.forEach((background: any) => {
    background.ranges.forEach((range: number[]) => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        applyRange(background, xStart, xLen, yStart, yLen);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRange(background, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(background, xStart, 1, yStart, 1);
      }
    });
  });
}

export function loadLevel() {
  return Promise.all([firstLvl, loadBackgroundSprites()]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    const levelSpecObj = JSON.parse(JSON.stringify(levelSpec));

    for (let i = 0; i < 100; i++) {
      levelSpecObj.backgrounds[1].ranges.push([
        Math.floor(Math.random() * 450), // x
        Math.floor(Math.random() * 20), // width
        Math.floor(Math.random() * 20), // y
        // eslint-disable-next-line prettier/prettier
        Math.floor(Math.random() * 3) // height
      ]);
    }

    console.log(levelSpecObj.backgrounds, 'levelSpecObj.backgrounds');

    createTiles(level, levelSpecObj.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    console.log(level);

    return level;
  });
}
