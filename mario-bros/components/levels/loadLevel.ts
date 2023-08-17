// import firstLvl from './1-1.json';
import Level from '../Level';
import { createBackgroundLayer, createSpriteLayer } from '../Layers';
import SpriteSheets from '../spriteSheets/SpriteSheets';
import tilesImage from '../../assets/imgSprites/tiles.png';

export default async function loadImage(url: any) {
  /* console.log('URL, typeof url', url, typeof url);
  let picture: any;
  if (typeof url === 'string') {
    picture = await fetch(url);
  } */
  // const picture = res.json().then((res) => res);
  // console.log(picture, 'picture');
  // console.log(url, 'loadimg url');
  /* let arrayBufferView;
  let blob;
  let urlCreator;
  let imageURL; */
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => {
      setTimeout(resolve, 100, image);
    });
    // if (typeof url !== 'string') {
    //  console.log('url not string', url);
    image.src = url.src;
    /* } else {
      picture.json().then((res: any) => {
        console.log('res', res);
        arrayBufferView = new Uint8Array(res);
        blob = new Blob([arrayBufferView], { type: 'image/png' });
        urlCreator = window.URL || window.webkitURL;
        imageURL = urlCreator.createObjectURL(blob);
        console.log('imageURL', imageURL);
        image.src = imageURL;
      });
    } */
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
  // console.log(firstLvl, 'firstLvl');
  // return fetch(url).then((r) => r.json());
  const response = await fetch(url);
  return response.json();
};

export function loadSpriteSheet(name: string, fLoad: any) {
  return loadJSON(`/api/mario-bros/staticData?file=${name}`)
    .then((sheetSpec) =>
      Promise.all([JSON.parse(sheetSpec), fLoad() /* loadImage(JSON.parse(sheetSpec).imageURL) */]),
    )
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheets(image, sheetSpec.tileW, sheetSpec.tileH);

      if (sheetSpec.tiles) {
        sheetSpec.tiles.forEach((tileSpec: any) => {
          sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
        });
      }

      /* if (sheetSpec.frames) {
        sheetSpec.frames.forEach((frameSpec: any) => {
          sprites.define(frameSpec.name, ...frameSpec.rect);
        });
      }

      if (sheetSpec.animations) {
        sheetSpec.animations.forEach((animSpec) => {
          const animation = createAnim(animSpec.frames, animSpec.frameLen);
          sprites.defineAnim(animSpec.name, animation);
        });
      } */

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
  });
}
