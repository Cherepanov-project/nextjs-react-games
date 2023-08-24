import { createSlice } from '@reduxjs/toolkit';

interface IMiracleFieldState {
  question: string;
  playerScore: number;
  cpu1Score: number;
  cpu2Score: number;
}

const initialState: IMiracleFieldState = {
  question: '',
  playerScore: 0,
  cpu1Score: 0,
  cpu2Score: 0,
};

const miracleFieldSlice = createSlice({
  name: 'miracleField',
  initialState,
  reducers: {},
});
