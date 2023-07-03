import Entity from './Entity';
import { loadMarioSprites } from './spriteSheets/LoadSprites';

export const createMario = () =>
  loadMarioSprites().then((sprite) => {
    const mario = new Entity();

    mario.draw = function drawMario(ctx: any) {
      sprite.draw('idle', ctx, mario.pos.x, mario.pos.y);
    };

    mario.update = function updateMario(deltaTime: any) {
      mario.pos.x += mario.vel.x * deltaTime;
      mario.pos.y += mario.vel.y * deltaTime;
    };

    return mario;
  });