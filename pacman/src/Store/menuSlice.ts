import { createSlice } from "@reduxjs/toolkit";
import { ghostBtns, DifficultyBtns, mapsBtns } from "../constants/constants";
import { IIinitialState } from "../Types/type";

const initialState: IIinitialState = {
  speed: 2,
  ghostCount: 4,
  ghostBtns: ghostBtns,
  DifficultyBtns: DifficultyBtns,
  mapsBtns: mapsBtns,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedDifficulty(state, action) {
      for (let i = 0; i < state.DifficultyBtns.length; i++) {
        state.DifficultyBtns[i].selected = false;
      }
      state.DifficultyBtns[action.payload].selected =
        !state.DifficultyBtns[action.payload].selected;

      state.speed = state.DifficultyBtns[action.payload].id;
    },
    setSelectedGhosts(state, action) {
      for (let i = 0; i < state.ghostBtns.length; i++) {
        state.ghostBtns[i].selected = false;
      }
      state.ghostBtns[action.payload].selected =
        !state.ghostBtns[action.payload].selected;

      state.ghostCount = state.ghostBtns[action.payload].id + 3;
    },
    setSelectedMaps(state, action) {
      for (let i = 0; i < state.mapsBtns.length; i++) {
        state.mapsBtns[i].selected = false;
      }
      state.mapsBtns[action.payload].selected =
        !state.mapsBtns[action.payload].selected;
    },
    // changeMap(state, action) {
    //   state.mapsBtns.forEach((el) => {
    //     if (el.selected) {
    //       el.field[action.payload[0]][action.payload[1]] = 3;
    //     }
    //   });
    // },
  },
});

export const {
  setSelectedDifficulty,
  setSelectedGhosts,
  setSelectedMaps,
  // changeMap,
} = menuSlice.actions;
export default menuSlice.reducer;
