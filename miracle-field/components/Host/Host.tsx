import { useEffect, useState } from 'react';

import classes from './Host.module.scss';

const Host = () => {
  //функционал не рабочий, нужно доделать
  const [speak, setSpeak] = useState(true);
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState(classes['host--active']);

  const renderClassName = () => {
    if (open) {
      setOpen(false);
      setClassName(`${classes.host} ${classes['host--active']}`);
    } else {
      setOpen(true);
      setClassName(classes.host);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => renderClassName(), 300);

    return () => clearInterval(interval);
  }, []);

  return <div className={className} />;
};

export default Host;
