import Host from '../Host/Host';
import Keyboard from '../Keyboard/Keyboard';
import Table from '../Table/Table';
import Wheel from '../Wheel/Wheel';

import classes from './Layout.module.scss';

const Layout = () => (
  <main className={classes.layout}>
    <Host />
    <Wheel />
    <Table />
    <Keyboard />
  </main>
);

export default Layout;
