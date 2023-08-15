import { loadMarioSprites } from './spriteSheets/LoadSprites';
import Entity from './Entity';
import Jump from './traits/Jump';
import Go from './traits/Go';
import Stomper from './traits/Stomper';
import Killable from './traits/Killable';

function createMarioFactory(sprite: any) {
  function drawMario(ctx: any) {
    sprite.draw('idle', ctx, 0, 0);
  }

  return function createMario() {
    const mario = new Entity('mario');
    mario.size.set(14, 16);
    //  mario.offset.set(10, 20);
    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    mario.addTrait(new Stomper());
    mario.addTrait(new Killable());
    mario.killable.removeAfter = 0;
    mario.draw = drawMario;

    return mario;
  };
}

export function loadMario() {
  return loadMarioSprites().then(createMarioFactory);
}
