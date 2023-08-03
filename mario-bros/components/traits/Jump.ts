import { Trait } from '../Entity';
import { matrix } from '../Vec2';
import TileResolver from '../TileResolver';

export default class Jump extends Trait {
  private readonly duration: number;

  private engageTime: number;

  private readonly velocity: number;

  tabs: number;

  resolver: TileResolver;

  constructor() {
    super('jump');

    this.duration = 0.5;
    this.engageTime = 0;

    this.resolver = new TileResolver(matrix);

    this.velocity = 200;
    this.tabs = 2;
  }

  start() {
    this.engageTime = this.duration;
    this.tabs -= 1;
  }

  cancel() {
    this.engageTime = 0; // вызывается, когда отпустили палец с кнопки
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // как понять, что мы приземлились или не надо понимать?
  update(entity: any, deltaTime: number) {
    if (this.engageTime > 0 && this.tabs >= 0) {
      entity.vel.y = -this.velocity;

      console.log(entity.pos.y, 'entity.pos.y');

      console.log('entity.vel.y', entity.vel.y);

      this.engageTime -= deltaTime;
    }

    if (
      this.resolver.searchByPosition(entity.pos.x + 14, entity.pos.y + 16).tile.name === 'ground'
    ) {
      this.tabs = 2;
    }
  }
}
