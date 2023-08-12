import { Matrix } from './Vec2';
import Compositor from './Compositor';
import TileCollider from './TileCollider';
import EntityCollider from './EntityCollider';

export default class Level {
  private readonly gravity: number;

  public comp: Compositor;

  public entities: Set<any>;

  private readonly tiles: Matrix;

  private readonly tileCollider: TileCollider;

  private totalTime: number;

  entityCollider: EntityCollider;

  constructor() {
    this.gravity = 2000;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities);
    this.tiles = new Matrix();
    this.tileCollider = new TileCollider(this.tiles);
  }

  update(deltaTime: number) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime, this);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    });

    this.totalTime += deltaTime;
  }
}
