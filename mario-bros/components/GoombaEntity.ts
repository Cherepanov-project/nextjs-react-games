import Entity from './Entity';
import { loadGoombaSprites } from './spriteSheets/LoadSprites';
import PendulumWalk from './traits/PendulumWalk';

function createGoombaFactory(sprite: any) {
  function drawGoomba(context: any) {
    sprite.draw('walk-1', context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(18, 19);
    goomba.addTrait(new PendulumWalk());
    goomba.draw = drawGoomba;

    return goomba;
  };
}

export function loadGoomba() {
  return loadGoombaSprites().then(createGoombaFactory);
}
