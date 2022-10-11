import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChangeTheme, Game } from '../../pages';
import { Layout } from '../Layout/Layout';

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<ChangeTheme />} />
      <Route path="/theme" element={<ChangeTheme />} />
      <Route path="/game" element={<Game />} />
    </Route>
  </Routes>
);

export { App };