import Vec2 from './Vec2';
import BoundingBox from './BoundingBox';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

export class Trait {
  private NAME: string;

  constructor(name: string) {
    this.NAME = name;
  }

  getName() {
    return this.NAME;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  obstruct(entity: object, side: any) {}

  update() {
    console.warn('Unhandled update call in Trait');
  }
}

export default class Entity {
  pos: Vec2;

  size: Vec2;

  vel: Vec2;

  private traits: number[];

  draw: (ctx: any) => void;

  offset: Vec2;

  bounds: BoundingBox;

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.traits = [];
  }

  addTrait(trait: any) {
    this.traits.push(trait);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // idk how to fix it (ts)
    this[trait.NAME] = trait;
  }

  obstruct(side: any) {
    this.traits.forEach((trait: any) => {
      trait.obstruct(this, side);
    });
  }

  update(deltaTime: number) {
    this.traits.forEach((trait: any) => {
      trait.update(this, deltaTime);
    });
  }
}
