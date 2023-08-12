export default class SpriteSheets {
  private image: any;

  private width: any;

  private height: any;

  private tiles: any;

  constructor(image: any, width: any, height: any) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name: any, x: any, y: any, width: any, height: any) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer.getContext('2d').drawImage(this.image, x, y, width, height, 0, 0, width, height);
    this.tiles.set(name, buffer);

    /* const buffers = [false, true].map((flip) => {
      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;

      const context = buffer.getContext('2d');

      if (flip) {
        context.scale(-1, 1);
        context.translate(-width, 0);
      }

      context.drawImage(this.image, x, y, width, height, 0, 0, width, height);

      return buffer;
    });

    this.tiles.set(name, buffers); */
  }

  defineTile(name: any, x: any, y: any) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name: any, ctx: any, x: any, y: any) {
    const buffer = this.tiles.get(name);
    ctx.drawImage(buffer, x, y);
    // eslint-disable-next-line no-undef
    // const buffer = this.tiles.get(name)[flip ? 1 : 0];
    // ctx.drawImage(buffer, x, y);
  }

  drawTile(name: any, ctx: any, x: any, y: any) {
    this.draw(name, ctx, x * this.width, y * this.height);
  }
}
