import { DragEventHandler, MouseEventHandler } from 'react';

export type TypeCard = {
  style?: object;
  first?: boolean;
  img: string;
  name: number;
  position: string;
  draggable: boolean;
  onDragStart?: DragEventHandler;
  onDragEnd?: DragEventHandler;
  onDragOver?: DragEventHandler;
  onDrop?: DragEventHandler;
  onDrag?: DragEventHandler;
  onDoubleClick?: MouseEventHandler;
};

export interface TypeCardFull {
  id: number;
  nameCard: number;
  suit: string;
  img: string;
  open: boolean;
  color: string;
}

export type TypeDragItem = {
  items: TypeCardFull[];
  idStack: number;
};
export interface TypeResultStack {
  [key: number]: TypeCardFull[];
}
export interface TypeDataCardsState {
  cards: TypeCardFull[];
  sortCards: TypeCardFull[];
  gameCards: TypeCardFull[][];
  helperCards: TypeCardFull[];
  resultStack: TypeResultStack;
  counter: number;
  moveCounter: number;
  isReady: boolean;
  onRules: boolean;
  isWin: boolean;
  dragItem: TypeDragItem;
  dragOver: number;
  gamePoints: number;
  theBestPoints: number;
}

export enum CardsActionTypes {
  SORT_CARDS = 'SORT_CARDS',
  SET_GAME_CARDS = 'SET_GAME_CARDS',
  SET_IS_READY = 'SET_IS_READY',
  SET_HELPER_CARDS = 'SET_HELPER_CARDS',
  SET_RESULT_STACK = 'SET_RESULT_STACK',
  SET_ON_RULES = 'SET_ON_RULES',
  SET_COUNTER = 'SET_COUNTER',
  SET_MOVE_COUNTER = 'SET_MOVE_COUNTER',
  SET_IS_WIN = 'SET_IS_WIN',
  SET_DRAG_ITEM = 'SET_DRAG_ITEM',
  SET_DRAG_OVER = 'SET_DRAG_OVER',
  SET_GAME_POINTS = 'SET_GAME_POINTS',
  SET_THE_BEST_POINTS = 'SET_THE_BEST_POINTS',
}

interface TypeSetOnRules {
  type: CardsActionTypes.SET_ON_RULES;
  payload: boolean;
}

interface TypeSetIsWin {
  type: CardsActionTypes.SET_IS_WIN;
  payload: boolean;
}

interface TypeSortCards {
  type: CardsActionTypes.SORT_CARDS;
  payload?: TypeCardFull[];
}

interface TypeSetGameCards {
  type: CardsActionTypes.SET_GAME_CARDS;
  payload?: TypeCardFull[][];
}

interface TypeSetHelperCards {
  type: CardsActionTypes.SET_HELPER_CARDS;
  payload?: TypeCardFull[];
}

interface TypeSetResultStack {
  type: CardsActionTypes.SET_RESULT_STACK;
  payload: {
    [key: number]: TypeCardFull[];
  };
}

interface TypeActionSetIsReady {
  type: CardsActionTypes.SET_IS_READY;
  payload: boolean;
}

interface TypeSetCounter {
  type: CardsActionTypes.SET_COUNTER;
  payload: number;
}

interface TypeSetMoveCounter {
  type: CardsActionTypes.SET_MOVE_COUNTER;
  payload: number;
}

interface TypeSetDragItem {
  type: CardsActionTypes.SET_DRAG_ITEM;
  payload: TypeDragItem;
}

interface TypeSetDragOver {
  type: CardsActionTypes.SET_DRAG_OVER;
  payload: number;
}

interface TypeSetGamePoints {
  type: CardsActionTypes.SET_GAME_POINTS;
  payload: number;
}

interface TypeSetTheBestPoints {
  type: CardsActionTypes.SET_THE_BEST_POINTS;
  payload: number;
}

export type TypeActions =
  | TypeSetOnRules
  | TypeSortCards
  | TypeSetGameCards
  | TypeActionSetIsReady
  | TypeSetHelperCards
  | TypeSetResultStack
  | TypeSetCounter
  | TypeSetMoveCounter
  | TypeSetIsWin
  | TypeSetDragItem
  | TypeSetDragOver
  | TypeSetGamePoints
  | TypeSetTheBestPoints;

export type TypeDispatch = (arg: TypeActions) => TypeActions;