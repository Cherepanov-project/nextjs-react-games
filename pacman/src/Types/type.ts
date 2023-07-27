export type Location = {
  x: number;
  y: number;
}[];

export interface IBtns {
  id: number;
  name: string;
  image?: any;
  selected: boolean;
  field?: any;
}

export interface IMapsBtns {
  id: number;
  name: string;
  image: any;
  selected: boolean;
  // field: any;
}

export interface IIinitialState {
  speed: number;
  ghostCount: number;
  ghostBtns: IBtns[];
  DifficultyBtns: IBtns[];
  mapsBtns: IMapsBtns[];
}
