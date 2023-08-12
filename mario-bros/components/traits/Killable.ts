import { Trait } from '../Entity';

export default class Killable extends Trait {
  dead: boolean;

  deadTime: number;

  removeAfter: number;

  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 2;
  }

  kill() {
    this.dead = true;
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  update(entity: any, deltaTime: any, level: any) {
    if (this.dead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity);
      }
    }
  }
}
