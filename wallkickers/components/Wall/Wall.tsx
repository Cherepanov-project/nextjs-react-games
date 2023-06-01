import React from 'react';

import { grassWall, woodCircledWall } from '../../constants/wallConstants';

import styles from './Wall.module.scss';

type WallProps = {
  element: {
    name: string;
    width: number;
    height: number;
    left: number;
    bottom: number;
  };
};

const Wall: React.FC<WallProps> = ({ element }: any) => {
  const { name, width, height, left, bottom } = element;
  if (name === woodCircledWall)
    return <div className={styles.woodCircleWall} style={{ width, height, left, bottom }} />;
  if (name === grassWall) {
    return <div className={styles.grassWall} style={{ width, height, left, bottom }} />;
  }
  return null;
};

export default Wall;
