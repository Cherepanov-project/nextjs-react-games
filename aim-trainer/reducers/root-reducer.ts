/* eslint-disable @typescript-eslint/no-unused-vars */
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { boardReducer } from './board-slice';
import { targetsReducer } from './targets-slice';
import { gameReducer } from './game-slice';
import { statisticsReducer } from './statistics-slice';
import { difficultReducer } from './difficulty-slice';
import { leaderListReducer } from './leader-list-slice';

const createNoopStorage = () => ({
  getItem(_key: any) {
    return Promise.resolve(null);
  },
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: any) {
    return Promise.resolve();
  },
});
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const aimTrainerRootReducer = persistReducer(
  {
    key: 'aim-trainer',
    storage,
    whitelist: ['leaderList'],
  },
  combineReducers({
    board: boardReducer,
    targets: targetsReducer,
    game: gameReducer,
    statistics: statisticsReducer,
    difficulty: difficultReducer,
    leaderList: leaderListReducer,
  }),
);
