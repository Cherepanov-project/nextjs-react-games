import Entity, { Trait } from './Entity';
import { loadGoombaSprites } from './spriteSheets/LoadSprites';
import PendulumWalk from './traits/PendulumWalk';
import Killable from './traits/Killable';

class Behavior extends Trait {
  constructor() {
    super('behavior');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collides(us: any, them: any) {
    if (us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y < us.vel.y) {
        us.killable.kill();
        us.pendulumWalk.speed = 0;
      } else {
        them.killable.kill();
      }
    }
    /* if (us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        us.killable.kill();
        us.pendulumMove.speed = 0;
      } else {
        them.killable.kill();
      }
    } */
  }
}

function createGoombaFactory(sprite: any) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  // const it: any = this;

  function routeImage(goomba: any) {
    if (goomba.killable.dead) {
      console.log('GOOMBA IS DEAD');
      return 'flat';
    }

    return 'walk-1';
  }

  function drawGoomba(this: any, context: any) {
    sprite.draw(routeImage(this), context, 0, 0);
  }

  return function createGoomba() {
    const goomba = new Entity();
    goomba.size.set(18, 19);
    goomba.addTrait(new PendulumWalk());
    goomba.addTrait(new Behavior());
    goomba.addTrait(new Killable());
    goomba.draw = drawGoomba;

    return goomba;
  };
}

export function loadGoomba() {
  return loadGoombaSprites().then(createGoombaFactory);
}
