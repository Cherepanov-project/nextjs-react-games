
import { Colors } from '../Colors';
import { Cell } from '../Cell';
let _ = require('lodash')

const logo = require("../../assets/img/black-bishop.png");

export enum FigureNames {
  FIGURE = "Фигура",
  KING = "Король",
  KNIGHT = "Конь",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  // can $this figure move to $target cell
  validMove(target: Cell, checkKing: boolean = false): boolean { // target: Cell ячейка на которую мы хотим переместиться
    // if there is our figure on this cell, then no
    if (target.figure?.color === this.color) {
      return false;
    }
    // if there is the opponent's King on $target cell
    if (!checkKing && target.figure?.name === FigureNames.KING) {
      return false;
    }
    return true;
  }


  canMove(target: Cell, checkKing: boolean = false): boolean {
    if (!this.validMove(target, checkKing)) {
      return false
    }

    if (!checkKing) {
      const blackKing = this.cell.board.blackKing
      const whiteKing = this.cell.board.whiteKing

      const board = this.cell.board
      const newBoard = _.cloneDeep(board);

      const newTarget = newBoard.getCell(target.x, target.y) // на какую ячейку идем
      const newCurrentCell = newBoard.getCell(this.cell.x, this.cell.y) //  с какой ячейки идем
      const ourKing = this.cell.figure?.color === blackKing?.color ? blackKing?.cell : whiteKing?.cell
      const newOurKing = newBoard.getCell(ourKing?.x, ourKing?.y).figure
      newCurrentCell.figure.moveFigure(newTarget)
      newTarget.setFigure(newCurrentCell.figure);
      newCurrentCell.figure = null
      newBoard.canAttackKing(newTarget.figure.color)
      return !newOurKing.underAttackKing
    } else {
      return true
    }

  }

  moveFigure(targer: Cell) { } // метод при помощи которого будем фигуру перемещать
}