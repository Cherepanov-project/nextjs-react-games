import { Trait, Sides } from '../Entity';

export default class PendulumWalk extends Trait {
  speed: number;

  constructor() {
    super('pendulumWalk');
    this.speed = 30;
  }

  obstruct(entity: any, side: any) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: any, deltaTime: any) {
    entity.vel.x = this.speed;
  }
}
