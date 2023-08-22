import Entity from './Entity';
import { loadKoopaSprites } from './spriteSheets/LoadSprites';
import PendulumWalk from './traits/PendulumWalk';

function createKoopaFactory(sprite: any) {
  function drawKoopa(context: any) {
    sprite.draw('walk-1', context, 0, 0);
  }

  return function createKoopa() {
    const goomba = new Entity();
    goomba.size.set(18, 18);
    goomba.addTrait(new PendulumWalk());
    goomba.draw = drawKoopa;

    return goomba;
  };
}

export function loadKoopa() {
  return loadKoopaSprites().then(createKoopaFactory);
}
