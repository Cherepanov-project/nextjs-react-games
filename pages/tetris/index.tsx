import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

import style from '../../tetris2/styles/index.module.scss';
import Button from '../../tetris2/components/button/button';
import { startGame } from '../../tetris2/store/tetrisSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import SettingPic from '../../public/gear-svgrepo-com.svg';

function HelloTetris() {
  const dispatch = useAppDispatch();
  return (
    <div className={style.container}>
      <Head>
        <meta name="keywords" content="tetris, online-games" />
      </Head>
      <main>
        <Link href="/tetris/settings">
          <a>
            <Button theme="settings">
              <Image src={SettingPic} alt="" />
            </Button>
          </a>
        </Link>
        <Link href="/tetris/game">
          <a onClick={() => dispatch(startGame())}>
            <Button theme="play">Play</Button>
          </a>
        </Link>
        <Link href="/tetris/score-table">
          <a>
            <Button theme="score">Score</Button>
          </a>
        </Link>
        <Link href="/">
          <a>
            <Button theme="back">Back</Button>
          </a>
        </Link>
      </main>
    </div>
  );
}

export default HelloTetris;
