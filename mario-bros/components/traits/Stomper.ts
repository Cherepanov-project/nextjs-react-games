import { Trait } from '../Entity';

export default class Stomper extends Trait {
  bounceSpeed: number;

  constructor() {
    super('stomper');
    this.bounceSpeed = 400;
  }

  bounce(us: any, them: any) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
  }

  collides(us: any, them: any) {
    if (them.killable && us.vel.y > them.vel.y) {
      this.bounce(us, them);
    }
  }
}
