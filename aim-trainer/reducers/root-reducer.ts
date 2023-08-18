import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { boardReducer } from './board-slice';
import { targetsReducer } from './targets-slice';
import { gameReducer } from './game-slice';
import { statisticsReducer } from './statistics-slice';
import { difficultReducer } from './difficulty-slice';
import { leaderListReducer } from './leader-list-slice';

export const aimTrainerRootReducer = persistReducer(
  {
    key: 'aim-trainer',
    storage: AsyncStorage,
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
