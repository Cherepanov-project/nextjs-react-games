import { createSlice } from '@reduxjs/toolkit';

import { woodCircledWall } from '../constants/wallConstants';

export interface Walls {
  id: number;
  name: string;
  left: number;
  bottom: number;
  width: number;
  height: number;
}
export interface Character {
  characterBottom: number;
  characterLeft: number;
  characterDirection: 'left' | 'right';
  characterHooked: boolean;
  characterOneTimeJumps: number;
  characterStart: boolean;
}

type WallkickersState = {
  walls: Walls[];
  character: Character;
  zeroHeight: number;
  gravity: number;
};

const initialState: WallkickersState = {
  walls: [
    {
      id: 3,
      name: woodCircledWall,
      left: 500,
      bottom: 40,
      width: 15,
      height: 400,
    },
    {
      id: 4,
      name: woodCircledWall,
      left: 500,
      bottom: 300,
      width: 15,
      height: 400,
    },
    {
      id: 5,
      name: woodCircledWall,
      left: 500,
      bottom: 700,
      width: 15,
      height: 440,
    },
    {
      id: 3,
      name: woodCircledWall,
      left: 200,
      bottom: 40,
      width: 15,
      height: 400,
    },
    {
      id: 4,
      name: woodCircledWall,
      left: 200,
      bottom: 300,
      width: 15,
      height: 400,
    },
    {
      id: 5,
      name: woodCircledWall,
      left: 300,
      bottom: 700,
      width: 15,
      height: 440,
    },
  ],
  zeroHeight: 40,
  gravity: 5,
  character: {
    characterBottom: 140,
    characterLeft: 330,
    characterDirection: 'left',
    characterHooked: true,
    characterOneTimeJumps: 0,
    characterStart: true,
  },
};

const wallkickersSlice = createSlice({
  name: 'walls',
  initialState,
  reducers: {
    characterChangeDirection: (state, action) => {
      state.character.characterDirection = action.payload;
    },
    characterChangeHooked: (state, action) => {
      state.character.characterHooked = action.payload;
    },
    characterChangeLeft: (state, action) => {
      state.character.characterLeft = action.payload;
    },
    changeCharacterBottom: (state, action) => {
      state.character.characterBottom = action.payload;
    },
    changeHeightCharacter: (state, action) => {
      state.walls = action.payload;
    },
    changeStart: (state, action) => {
      state.character.characterStart = action.payload;
    },
    characterChangeJump: (state, action) => {
      state.character.characterOneTimeJumps = action.payload;
    },
  },
});

export const {
  characterChangeDirection,
  changeHeightCharacter,
  characterChangeLeft,
  changeCharacterBottom,
  changeStart,
  characterChangeHooked,
  characterChangeJump,
} = wallkickersSlice.actions;
export default wallkickersSlice.reducer;
