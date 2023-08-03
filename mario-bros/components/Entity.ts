import Vec2 from './Vec2';

export class Trait {
  private NAME: string;

  constructor(name: string) {
    this.NAME = name;
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

  private vel: Vec2;

  private traits: number[];

  draw: (ctx: any) => void;

  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);

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
