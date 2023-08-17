// import firstLvl from './1-1.json';
import Level from '../Level';
import { createBackgroundLayer, createSpriteLayer } from '../Layers';
import { loadBackgroundSprites } from '../spriteSheets/LoadSprites';

export default function loadImage(url: any) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      setTimeout(resolve, 100, image);
    });
    image.src = url.src;
  });
}

export function createTiles(level: any, backgrounds: any) {
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

const loadJSON = async (url: string) => {
  // console.log(firstLvl, 'firstLvl');
  // return fetch(url).then((r) => r.json());
  const response = await fetch(url);
  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loadLevel(name: string) {
  // eslint-disable-next-line quotes
  return Promise.all([loadJSON('/api/mario-bros/staticData'), loadBackgroundSprites()]).then(
    ([levelSpec, backgroundSprites]) => {
      const level = new Level();

      const levelSpecObj = JSON.parse(levelSpec);

      /* for (let i = 0; i < 100; i++) {
        levelSpecObj.backgrounds[1].ranges.push([
          20 + i * 10, // x
          5, // width
          19, // y
          // eslint-disable-next-line prettier/prettier
        1// height
        ]);

        levelSpecObj.backgrounds[1].ranges.push([
          20 + i * 15, // x
          6, // width
          15, // y
          // eslint-disable-next-line prettier/prettier
        1// height
        ]);

        levelSpecObj.backgrounds[1].ranges.push([
          25 + i * 12, // x
          5, // width
          Math.floor(Math.random() * 10) + 2, // y
          // eslint-disable-next-line prettier/prettier
        1// height
        ]);
      } */

      createTiles(level, levelSpecObj.backgrounds);

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
      level.comp.layers.push(backgroundLayer);

      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);

      return level;
    },
  );
}
