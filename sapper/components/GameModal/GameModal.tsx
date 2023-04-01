import React from 'react';

import {
  setSettingsValue,
  setGameIndicator,
  getSapperState,
  setGameModal,
  setGameModalFalse,
} from '../../store/sapperSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import classes from './GameModal.module.scss';

interface IGameModalProps {
  title: string;
}

const GameModal: React.FC<IGameModalProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const { settingsValue } = useAppSelector(getSapperState);

  return (
    <div className={classes.gameModal}>
      <h2 className={classes.title}>{title}</h2>
      <button
        type="button"
        className={classes['gameModal-btn']}
        onClick={() => {
          dispatch(setGameIndicator('New game'));
          dispatch(setGameModalFalse());
          dispatch(setSettingsValue(settingsValue));
        }}
      >
        New game
      </button>
      <button
        type="button"
        className={classes['gameModal-btn-close']}
        onClick={() => {
          dispatch(setGameModal());
        }}
      >
        X
      </button>
    </div>
  );
};

export default GameModal;
