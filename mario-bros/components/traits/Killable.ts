import { Trait } from '../Entity';
import { store } from '../../redux/store';

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
    if (entity.name === 'mario' && store.getState() === 0) {
      level.entities.delete(entity);
    }
    if (this.dead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity);
      }
    }
  }
}
