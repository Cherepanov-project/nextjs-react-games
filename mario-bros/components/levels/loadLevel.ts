import Level from '../Level';
import { createBackgroundLayer, createSpriteLayer } from '../Layers';
import SpriteSheets from '../spriteSheets/SpriteSheets';
import tilesImage from '../../assets/imgSprites/tiles.png';

export default async function loadImage(url: any) {
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
          type: background.type,
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
  const response = await fetch(url);
  return response.json();
};

export function loadSpriteSheet(name: string, fLoad: any) {
  return loadJSON(`/api/mario-bros/staticData?file=${name}`)
    .then((sheetSpec) => Promise.all([JSON.parse(sheetSpec), fLoad()]))
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheets(image, sheetSpec.tileW, sheetSpec.tileH);

      if (sheetSpec.tiles) {
        sheetSpec.tiles.forEach((tileSpec: any) => {
          sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
        });
      }
      return sprites;
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loadLevel(name: string) {
  // eslint-disable-next-line quotes
  return Promise.all([
    loadJSON(`/api/mario-bros/staticData?file=${name}`),
    loadSpriteSheet('overworld.json', () => loadImage(tilesImage)),
  ]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    const levelSpecObj = JSON.parse(levelSpec);

    createTiles(level, levelSpecObj.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
}
