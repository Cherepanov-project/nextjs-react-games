import Host from '../Host/Host';
import Keyboard from '../Keyboard/Keyboard';
import Opponents from '../Opponents/Opponents';
import Table from '../Table/Table';
import Wheel from '../Wheel/Wheel';

import classes from './Layout.module.scss';

const Layout = () => (
  <main className={classes.layout}>
    <Host />
    <Table />
    <Wheel />
    <Opponents />
    <Keyboard />
  </main>
);

export default Layout;
