import Entity from './Entity';
import { loadGoombaSprites } from './spriteSheets/LoadSprites';

function createGoombaFactory(sprite: any) {
  function drawGoomba(context: any) {
    sprite.draw('walk-1', context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(19, 18);

    goomba.draw = drawGoomba;

    return goomba;
  };
}

export function loadGoomba() {
  return loadGoombaSprites().then(createGoombaFactory);
}
