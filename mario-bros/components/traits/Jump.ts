import { Trait } from '../Entity';

export default class Jump extends Trait {
  private readonly duration: number;

  private engageTime: number;

  private readonly velocity: number;

  ready: boolean;

  constructor() {
    super('jump');
    this.ready = false;
    this.duration = 0.5;
    this.engageTime = 0;

    this.velocity = 200;
  }

  start() {
    if (this.ready) {
      this.engageTime = this.duration;
    }
  }

  cancel() {
    this.engageTime = 0;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  update(entity: any, deltaTime: number) {
    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity;
      this.engageTime -= deltaTime;
    }

    this.ready = false;
  }

  obstruct(entity: object, side: any) {
    if (side === 'bottom') {
      this.ready = true;
    }
  }
}
