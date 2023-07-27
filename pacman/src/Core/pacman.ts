/* eslint-disable eqeqeq */
import {
  oneBlockSize,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  DIRECTION_LEFT,
  DIRECTION_BOTTOM,
  pacmanFrames,
} from '../constants/constants';

export class Pacman {
  public direction: number;

  public currentFrames: number;

  public frameCount: number;

  public nextDirection: number;

  public animationOn: boolean;

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public speed: number,
    public canvasContext: any,
    public map: number[][],
    public ghosts: any,
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = 0; // DIRECTION_RIGHT
    this.currentFrames = 7;
    this.frameCount = 7;
    this.nextDirection = this.direction;
    this.animationOn = false;
    this.canvasContext = canvasContext;
    this.map = map;
    this.ghosts = ghosts;

    setInterval(() => {
      this.changeAnimation();
    }, 100);
  }

  moveProcess() {
    this.changeDirectionIfPosible();
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
    }
  }

  eat() {
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[0].length; j++) {
        if (this.map[i][j] === 2 && this.getMapX() === j && this.getMapY() === i) {
          this.map[i][j] = 3;
          return true;
        }
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

  changeDirectionIfPosible() {
    if (this.direction == this.nextDirection) return;
    const tempDirection = this.direction;
    this.direction = this.nextDirection;
    this.moveForwards();
    if (this.checkCollision()) {
      this.moveBackwards();
      this.direction = tempDirection;
    } else {
      this.moveBackwards();
    }
  }

  changeAnimation() {
    if (this.animationOn && this.direction != 0) {
      this.currentFrames = this.currentFrames == this.frameCount ? 1 : this.currentFrames + 1;
    }
  }

  draw() {
    this.canvasContext.save();
    this.canvasContext.translate(this.x + oneBlockSize / 2, this.y + oneBlockSize / 2);
    this.canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
    this.canvasContext.translate(-this.x - oneBlockSize / 2, -this.y - oneBlockSize / 2);
    this.canvasContext.drawImage(
      pacmanFrames,
      (this.currentFrames - 1) * oneBlockSize,
      0,
      oneBlockSize,
      oneBlockSize,
      this.x,
      this.y,
      this.width,
      this.height,
    );

    this.canvasContext.restore();
  }

  getMapX(): number {
    return parseInt((this.x / oneBlockSize).toString(), 10);
  }

  getMapY(): number {
    return parseInt((this.y / oneBlockSize).toString(), 10);
  }

  getMapXRightSide(): number {
    return parseInt(((this.x + 0.9999 * oneBlockSize) / oneBlockSize).toString(), 10);
  }

  getMapYRightSide(): number {
    return parseInt(((this.y + 0.9999 * oneBlockSize) / oneBlockSize).toString(), 10);
  }
}
