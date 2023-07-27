import {
  oneBlockSize,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DIRECTION_LEFT,
  DIRECTION_BOTTOM,
  ghostFrames,
} from "../constants/constants";

export class Ghost {
  public direction: number;
  public animationOn: boolean;
  public randomTargetIndex: number;
  public randomTargetForGhosts: any;
  public currentFrames: number;
  public frameCount: number;
  public target: any;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public speed: number,
    public imageX: number,
    public imageY: number,
    public imageWidth: number,
    public imageHeight: number,
    public range: number,
    public canvasContext: any,
    public pacman: any,
    public map: any
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.currentFrames = 4;
    this.frameCount = 7;
    this.direction = 0; // DIRECTION_RIGHT
    this.animationOn = true;
    this.imageX = imageX;
    this.imageY = imageY;
    this.imageHeight = imageHeight;
    this.imageWidth = imageWidth;
    this.range = range;
    this.canvasContext = canvasContext;
    this.pacman = pacman;
    this.target = 0;
    this.randomTargetForGhosts = [
      { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
      { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
      { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
      {
        x: (map[0].length - 2) * oneBlockSize,
        y: (map.length - 2) * oneBlockSize,
      },
    ];

    this.randomTargetIndex = parseInt(
      (Math.random() * this.randomTargetForGhosts.length).toString()
    );

    setInterval(() => {
      this.changeRandomDIrection();
    }, 3000);
  }

  changeRandomDIrection() {
    this.randomTargetIndex += 1;
    this.randomTargetIndex = this.randomTargetIndex % 4;
  }

  moveProcess() {
    if (this.pacman.direction !== 0) {
      if (this.isInRangeOfPacman()) {
        this.target = this.pacman;
      } else {
        this.target = this.randomTargetForGhosts[this.randomTargetIndex];
      }
      this.changeDirectionIfPosible();
      this.moveForwards();
      if (this.checkCollision()) {
        this.moveBackwards();
      }
    }
  }

  moveBackwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x -= this.speed;
        break;
      case DIRECTION_UP:
        this.y += this.speed;
        break;
      case DIRECTION_LEFT:
        this.x += this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y -= this.speed;
        break;
    }
  }

  moveForwards() {
    switch (this.direction) {
      case DIRECTION_RIGHT:
        this.x += this.speed;
        break;
      case DIRECTION_UP:
        this.y -= this.speed;
        break;
      case DIRECTION_LEFT:
        this.x -= this.speed;
        break;
      case DIRECTION_BOTTOM:
        this.y += this.speed;
        break;
    }
  }

  checkCollision() {
    if (
      this.map[this.getMapY()][this.getMapX()] === 1 ||
      this.map[this.getMapYRightSide()][this.getMapX()] === 1 ||
      this.map[this.getMapY()][this.getMapXRightSide()] === 1 ||
      this.map[this.getMapYRightSide()][this.getMapXRightSide()] === 1
    ) {
      this.animationOn = false;
      this.currentFrames = 4;
      return true;
    }
    this.animationOn = true;
    return false;
  }

  isInRangeOfPacman() {
    let xDistance = Math.abs(this.pacman.getMapX() - this.getMapX());
    let yDistance = Math.abs(this.pacman.getMapY() - this.getMapY());
    if (
      Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range
    ) {
      return true;
    }
    return false;
  }

  changeDirectionIfPosible() {
    let tempDirection = this.direction;

    this.direction = this.calculateNewDirection(
      this.map,
      parseInt((this.target.x / oneBlockSize).toString()),
      parseInt((this.target.y / oneBlockSize).toString())
    );

    if (typeof this.direction == "undefined") {
      this.direction = tempDirection;
      return;
    }

    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  calculateNewDirection(map: number[][], destX: any, destY: any) {
    let mp = [];
    for (let i = 0; i < map.length; i++) {
      mp[i] = map[i].slice();
    }

    let queue: any = [
      {
        x: this.getMapX(),
        y: this.getMapY(),
        moves: [],
      },
    ];

    while (queue.length > 0) {
      let poped = queue.shift();
      if (poped.x === destX && poped.y === destY) {
        return poped.moves[0];
      } else {
        mp[poped.y][poped.x] = 1;
        let neighborList = this.addNeighbors(poped, mp);
        for (let i = 0; i < neighborList.length; i++) {
          queue.push(neighborList[i]);
        }
      }
    }

    return DIRECTION_UP;
  }

  addNeighbors(poped: any, mp: any) {
    let queue = [];
    let numOfRows = mp.length;
    let numOfColumns = mp[0].length;

    if (
      poped.x - 1 >= 0 &&
      poped.x - 1 < numOfRows &&
      mp[poped.y][poped.x - 1] !== 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_LEFT);
      queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
    }
    if (
      poped.x + 1 >= 0 &&
      poped.x + 1 < numOfRows &&
      mp[poped.y][poped.x + 1] !== 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_RIGHT);
      queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
    }
    if (
      poped.y - 1 >= 0 &&
      poped.y - 1 < numOfColumns &&
      mp[poped.y - 1][poped.x] !== 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_UP);
      queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
    }
    if (
      poped.y + 1 >= 0 &&
      poped.y + 1 < numOfColumns &&
      mp[poped.y + 1][poped.x] !== 1
    ) {
      let tempMoves = poped.moves.slice();
      tempMoves.push(DIRECTION_BOTTOM);
      queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
    }
    return queue;
  }

  changeAnimation() {
    if (this.animationOn && this.direction !== 0) {
      this.currentFrames =
        this.currentFrames === this.frameCount ? 1 : this.currentFrames + 1;
    }
  }

  draw() {
    this.canvasContext.save();
    this.canvasContext.drawImage(
      ghostFrames,
      this.imageX,
      this.imageY,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.canvasContext.restore();
  }

  getMapX(): number {
    return parseInt((this.x / oneBlockSize).toString());
  }

  getMapY(): number {
    return parseInt((this.y / oneBlockSize).toString());
  }

  getMapXRightSide(): number {
    return parseInt(
      ((this.x + 0.9999 * oneBlockSize) / oneBlockSize).toString()
    );
  }

  getMapYRightSide(): number {
    return parseInt(
      ((this.y + 0.9999 * oneBlockSize) / oneBlockSize).toString()
    );
  }
}
